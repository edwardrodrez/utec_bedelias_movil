import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface ret {
  idacta: number;
  calificacion: number;
}

export interface val {
  idperiodo: number;
  idusuario: number;
}

export interface Resval {
  res: boolean;
  mensaje: string;
}

export interface info {
  res: boolean;
  mensaje: string;
  nombre:string;
  creditos:number;
  idperiodo: number;
}

export interface periodos {
  idperiodo: number;
  curso: curso;
  sede: sede;
  fechaInicial:Date;
  puedo:boolean
  mensaje:string
}

export interface curso {
  nombre: string;
  credito: number;
}
export interface sede {
  nombre: string;
}

export interface direccion {
  departamento: string;
  ciudad: string;
}
@Component({
  selector: 'app-modal-examen',
  templateUrl: './modal-examen.component.html',
  styleUrls: ['./modal-examen.component.scss'],
})
export class ModalExamenComponent  {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  items = ["Examen de Java","Examen de Redes","Base de Datos","Sistema Operativo","Programacion Avanzada","Base de Datos","Sistema Operativo","Programacion Avanzada","Base de Datos","Sistema Operativo","Programacion Avanzada","Base de Datos","Sistema Operativo","Programacion Avanzada"];
  typesOfShoes: periodos[];
  val:val;
  resval:Resval;
  info:info;
  constructor(private modalCtrl: ModalController, private _service:LoginService,public alertController: AlertController,public toastController: ToastController) { 
    this.getExamenes();
    this.val ={
      idperiodo: 0,
      idusuario: 0
    }

    this.resval ={
      res: false,
      mensaje: ""
    }

    this.info ={
      res: false,
      mensaje: "",
      creditos: 0,
      nombre: "",
      idperiodo: 0
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }
  doInfinite(infiniteScroll) {

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push(this.typesOfShoes.length.toString());
      }

      infiniteScroll.target.complete(); // this is how you need to call in v4
    }, 500);
  }
  getExamenes(){
    this._service.getExamenAlumno(localStorage.getItem('idusuario')).subscribe(Response => {
      this.typesOfShoes = Response;
      for(let i= 0;i<this.typesOfShoes.length;i++){
        this.val ={
          idperiodo: this.typesOfShoes[i].idperiodo,
          idusuario: parseInt(localStorage.getItem('idusuario'))
        }
        this._service.Validacion(this.val).subscribe(Response => {
          this.resval = Response;
          this.info ={
            res: this.resval.res,
            mensaje: this.resval.mensaje,
            creditos: this.typesOfShoes[i].curso.credito,
            nombre: this.typesOfShoes[i].curso.nombre,
            idperiodo: this.typesOfShoes[i].idperiodo
          };
          if(this.resval.res == true){
            this.typesOfShoes[i].puedo = true;
            this.typesOfShoes[i].mensaje = this.resval.mensaje
         }else{
            this.typesOfShoes[i].puedo = false;
            this.typesOfShoes[i].mensaje = this.resval.mensaje
         }
        });      

      }
    });
  };
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  Validacion(id,curso:curso){
    this.val ={
      idperiodo: id,
      idusuario: parseInt(localStorage.getItem('idusuario'))
    }
    console.log(this.val)
    this._service.Validacion(this.val).subscribe(Response => {
      this.resval = Response;

      this.info ={
        res: this.resval.res,
        mensaje: this.resval.mensaje,
        creditos: curso.credito,
        nombre: curso.nombre,
        idperiodo: id
      };
      if(this.info.res == true){
        this.presentAlertConfirm() 
      }else{
        this.presentAlert(this.info.mensaje);
      }
    });


  };
  insc(val){
    this._service.addEstudiante(val).subscribe(Response=>{

       this.presentToast("Sé ah Inscripto al Examen de " + Response.curso.nombre,"primary") 
    },(err:HttpErrorResponse)=>{
      this.presentToast("Ya te encuentras inscripto al Examen","danger");
  });
  }
  async presentAlert(mens) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inscripción a Examen',
      subHeader: 'Comunicado :',
      message: mens,
      buttons: ['De Acuerdo']
    });

    await alert.present();
  }



  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inscribirte a Examen!',
      subHeader: 'Cumple con los requisitos previos a la inscripción',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Inscribirme ',
          handler: () => {

            this.insc(this.val);
          }
        }
      ]
    });

    await alert.present();
  }
  async presentToast(mensj,color) {
    const toast = await this.toastController.create({
      message: mensj,
      duration: 3000,
      color: color
    });
    toast.present();
  }
}
