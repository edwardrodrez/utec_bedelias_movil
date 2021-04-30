import { Component, OnInit } from '@angular/core';
import { Columns, Img, Item, Ol, PdfMakeWrapper, Stack } from 'pdfmake-wrapper';
import { Txt } from 'pdfmake-wrapper';
import { Table } from 'pdfmake-wrapper';
import { Carrera } from 'src/app/interfaces/carrera';
import { LoginService } from 'src/app/services/login.service';


import { formatDate } from '@angular/common';
import { Curso } from 'src/app/interfaces/curso';
import { Sede } from 'src/app/interfaces/sede';
import {Md5} from 'ts-md5/dist/md5';
import { ToastController } from '@ionic/angular';
export interface PeriodicElement {
  idusuario?: number;
  idcarrera?: number;
}

export interface dtescolaridad {
  nombre?:string,
  apellido?:string,
  cedula?:number,
  añoDeIngreso?:Date,
  carrera?:string,
  Promedio?:number,
  creditosTotales?:number,
  creditosDeCarrera?:number,
  areas?:Areadeestudio[]
}
export interface Areadeestudio {
  nombre:string,
  creditosMinimos:number,
  creditosTiene:number,
  materias:Materia[]
}
export interface Materia {
  materia:string,
  tipo:string,
  fecha:Date,
  nota:number,
  creditos:number
}

@Component({
  selector: 'app-escolaridad',
  templateUrl: './escolaridad.page.html',
  styleUrls: ['./escolaridad.page.scss'],

})
export class EscolaridadPage implements OnInit {
  public loading: boolean = false;
  carrerasUs: Carrera[] = [];
  cursos:Curso[];
  sedes:Sede[];
  actual:Carrera;
  us:PeriodicElement = {};
  dtesc:dtescolaridad= {};
  today: Date = new Date();

  escgen = {
    codigo: "",
    fechaExpiracion: "",
    pdf: ""
  }


  pdfMake: any;
  carrera:Carrera = {
    idcarrera: 0,
    nombre: "",
    creditoMinimo: 0,
    cursos: null,

  };
  carre :Carrera;
  selectItem;
  selected;
  constructor(private _service:LoginService,public toastController: ToastController) {

  
   }

  ngOnInit() {
    this.getCarrerasUs()


  }
  public optionsFn(): void { //here item is an object 
    console.log(this.carrera);

    let item = this.carrera; // Just did this in order to avoid changing the next lines of code :P
    this.carre = item;
  }
  getCarrerasUs(){
    this._service.getCarrerasUs(parseInt(localStorage.getItem('idusuario'))).subscribe(Response=>{
      this.carrerasUs = Response;
    })
  }
  getEscolaridad(){
    this.us.idusuario = parseInt(localStorage.getItem('idusuario'));
    this.us.idcarrera = this.carrera.idcarrera;
    if(this.us.idcarrera == 0){
      this.presentToast("Seleccione una carrera, por favor","danger");
    }else{
      console.log(this.us)
      this._service.getEscolaridadInfo(this.us).subscribe(Response=>{
        this.dtesc = Response;
        this.generarEscolaridad(this.dtesc);
        });

    }

  }
  async presentToast(mensj,color) {
    const toast = await this.toastController.create({
      message: mensj,
      duration: 3000,
      color: color
    });
    toast.present();
  }
  async generarEscolaridad(id){

    const pdf = new PdfMakeWrapper();
    let dia = new Date().getDate();
    let mes= new Date().getMonth() + 1;
    let anio = new Date().getFullYear();
    let hora = new Date().getHours();
    let min = new Date().getMinutes();
    let hratotal = hora + ' : ' +'0'+ min;
    let date1 = dia +'/'+ mes +'/'+ anio;
    
    //GENERANDO HASH 
    const md5 = new Md5();

      pdf.pageMargins([ 45, 25, 45, 25 ]);
      pdf.add(
        await new Img('../assets/img/logo-utec.png').height(40).width(40).build()

      );
      pdf.add(
        pdf.ln(1)
      );
      pdf.add(

        new Columns([ 'UTEC BEDELIAS', date1+ ' '+ ' '+ new Date().toLocaleTimeString() ]).alignment("center").bold().fontSize(13).end

      );
      
      pdf.add(
        pdf.ln(2)
      );
      pdf.add(
        new Stack([ 'Certificado de Escolaridad']).alignment("center").italics().end 
      );
      pdf.add(
        pdf.ln(1)
      );
      pdf.add(
        new Stack([ this.dtesc.cedula + ' ' + this.dtesc.nombre + ' ' + this.dtesc.apellido]).alignment("center").bold().end 
      );
      pdf.add(
        pdf.ln(3)
      );

      pdf.add(

        new Table(
          [
            [ 'Carrera', 'Fecha de Ingreso'],
            [this.dtesc.carrera + ' '+'',''+ ' ' + this.dtesc.añoDeIngreso + ' '],
          ],

      ).bold().widths("*").end
      );

      pdf.add(
        pdf.ln(2)
      );

     
      pdf.add(
        new Stack([ 'Áreas de Estudio']).alignment("center").bold().fontSize(12).end 
      );
      pdf.add(
        pdf.ln(1)
      );
      //Listo las areas de  la escolaridad
   
      this.dtesc.areas.forEach(function(entry){ 
              pdf.add(

                new Table(
                  [
                    [ 'Nombre del Área', 'Créditos Mínimos', 'Créditos Obtenidos'],
                    [ entry.nombre, entry.creditosMinimos, entry.creditosTiene],
                  ],

              ).widths("*").end
              );
              pdf.add(
                pdf.ln(1)
              );
              pdf.add(
                new Stack(['Materias de ' + ' ' +entry.nombre  ]).bold().alignment("left").end,
              );

              pdf.add(
                pdf.ln(1)
              );
            entry.materias.forEach(function(childrenEntry) { // was missing a )
              pdf.add(
            
                new Table(
                  [
                    [ 'Nombre de Materia', 'Tipo', 'Fecha', 'Créditos'],
                    [ childrenEntry.materia,childrenEntry.tipo, childrenEntry.fecha,childrenEntry.creditos],
                  ],
      
              ).widths("*").end
              );
              pdf.add(
                pdf.ln(1)
              );
              
            });
        });

    

        pdf.add(
          pdf.ln(4)
        );
        // RESULTADOS DEL ALUMNO
        pdf.add(

          new Table(
            [
              [ 'Promedio', this.dtesc.Promedio],
              [ 'Créditos Totales',  this.dtesc.creditosTotales ],
              [ 'Créditos de la Carrera',this.dtesc.creditosDeCarrera],
            ],
  
        ).bold().widths("*").end
        );



      pdf.add(
        pdf.ln(10)
      );
      // Codigo de verificacion
      let r = Math.random().toString(36).substring(7);
      let cod = md5.appendStr(r).end();
      //FECHA DE EXPIRACION
      this.today = new Date();
      this.today = new Date(new Date(this.today).setMonth(this.today.getMonth()+1));
      this.escgen.fechaExpiracion = formatDate(this.today, 'yyyy-MM-dd', 'en-US');

      pdf.add(
        new Stack([ 'Código de verificación : '+ ' '+ cod +' '+' '+ ' ' +'Válido hasta : '+' '+this.escgen.fechaExpiracion]).alignment("center").italics().end 
      );

      pdf.add(
        pdf.ln(1)
      );
      pdf.add(
        new Item(
          new Txt('Validar en : http://localhost:4200/ValidarEscolaridad').alignment("center").bold().end
      ).link("http://localhost:4200/ValidarEscolaridad").decoration("underline").end,
      );
      pdf.create().open();


      this.escgen.codigo = cod.toString();


      //CONVERTIR A BASE 64
  
      pdf.create().getBlob((data) => {   
        console.log(data)  
        var reader = new FileReader();
        reader.onloadend = () => {
          var base64data = reader.result;                
              console.log(base64data);
              
              this.escgen.pdf = reader.result as string
              
              this.addEscolaridad(reader.result as string);
        }
        
        reader.readAsDataURL(data); 
      });

  }

  addEscolaridad(pdf){
    this.escgen.pdf = pdf;
    console.log(this.escgen);
    this._service.addEscolaridad(this.escgen).subscribe(Response=>{
    
      });
  
  }

}
