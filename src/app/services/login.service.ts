import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public Persona;
  constructor(private http:HttpClient,private router: Router,public toastController: ToastController) { 
    this.Persona ={
      ci:"",
      nombre:"",
      apellido:"",
      correo:"",
      telefono:"",
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
    loginEstudiante(data:any){
      return this.http.post<any>("http://localhost:8000/usuario/login", data , this.getheaders()).subscribe((resp: any) => {
  
            this.router.navigate(['/home']);
            localStorage.setItem('token', resp.token);
            localStorage.setItem('roles', JSON.stringify(resp.roles));
            localStorage.setItem('idusuario', JSON.stringify(resp.idusuario));
            localStorage.setItem('persona', JSON.stringify(resp.persona));
            var p = JSON.parse(localStorage.getItem('persona')) ;
            this.Persona ={
              ci:p.ci,
              nombre:p.nombre,
              apellido:p.apellido,
              correo:p.correo,
              telefono:p.telefono,
            }
            this.presentToast("Bienvenid@ " + " "+" "+ this.Persona.nombre,"primary");
        },(err:HttpErrorResponse)=>{
            this.presentToast("El Usuario o Password no es Valido","danger");
        });
    }

    getheaders(){
      return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
      };
    }
        //$router->get('/Carrera/getCarrerasUs/{id}', 'CarrerasController@getCarrerasUs');
    getCarrerasUs(id:number):Observable<any>{
      return this.http.get("http://localhost:8000/Carrera/getCarrerasUs/"+id);
    };

    //$router->post('/usuario/getEscolaridadInfo', 'UsuarioController@addCertificados');
    getEscolaridadInfo(us):Observable<any>{
      return this.http.post("http://localhost:8000/usuario/getEscolaridadInfo",us);
    };

    //$router->post('/usuario/getEscolaridadPdf', 'UsuarioController@getEscolaridadPdf');
    getEscolaridadPdf(us):Observable<any>{
      return this.http.post("http://localhost:8000/usuario/getEscolaridadPdf",us);
    };

    //$router->post('/usuario/addEscolaridad', 'UsuarioController@addEscolaridad');
    addEscolaridad(us):Observable<any>{
      return this.http.post("http://localhost:8000/usuario/addEscolaridad",us);
    };

    getLectivosAlumno(id : string):Observable<any>{
      return this.http.post("http://localhost:8000/Periodos/getLectivosAlumno",{idusuario:id});
    };
    getExamenAlumno(id : string):Observable<any>{
      return this.http.post("http://localhost:8000/Periodos/getExamenAlumno",{idusuario:id});
    };
    addEstudiante(data:any):Observable<any>{
      return this.http.post("http://localhost:8000/Periodos/addEstudiante",data)
    };
  
    Validacion(data:any):Observable<any>{
      return this.http.post("http://localhost:8000/usuario/Validacion",data)
    };
}
