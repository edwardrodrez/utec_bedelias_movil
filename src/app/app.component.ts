import { Component } from '@angular/core';

import { AlertController, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LogoutPageModule } from './pages/logout/logout.module';
import { ModalLogoutComponent } from './modal-logout/modal-logout.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar,
    public alertController: AlertController,
    private modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
  async openLogout(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar Session',
      subHeader: 'Esta seguro que desea cerrar session ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.Logout();
          }
        }
      ]
    });

    await alert.present();
  }
  Logout(){
    localStorage.removeItem("roles")
    localStorage.removeItem("token")
    localStorage.removeItem("idusuario")
    localStorage.removeItem("persona")
    this.router.navigate(['/']);
  }
}
