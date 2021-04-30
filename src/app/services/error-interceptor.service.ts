import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import { CanActivate, Router } from '@angular/router'
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,public toastController: ToastController) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {

          errorMessage = `${error.error.message}`;
        } else {

          errorMessage =  `${error.error}`;
        }


        if( errorMessage == '[object ProgressEvent]'){
          errorMessage = "Error inesperado intentelo mas tarde"
        }
        if( errorMessage == 'null'){
          this.router.navigate(['/']);
          errorMessage = "No tiene permisos para acceder a esta ruta"
        }
        if( errorMessage == 'usuario no encontrado'){
          this.router.navigate(['/']);

        }
        if(errorMessage != 'usuario no encontrado'){
          this.presentToast(errorMessage,"danger")
        }

        return throwError(errorMessage);
      })
    );
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
