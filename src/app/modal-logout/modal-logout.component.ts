import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss'],
})
export class ModalLogoutComponent  {

  constructor(private modalCtrl: ModalController,private router: Router) { 

  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }
  Logout(){
    localStorage.removeItem("roles")
    localStorage.removeItem("token")
    localStorage.removeItem("idusuario")
    localStorage.removeItem("persona")
    this.router.navigate(['/']);
    this.modalCtrl.dismiss();
  }
}
