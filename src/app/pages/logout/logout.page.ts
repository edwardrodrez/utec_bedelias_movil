import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private modalCtrl: ModalController,private router: Router) { }

  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
  }
  Logout(){
    localStorage.removeItem("roles")
    localStorage.removeItem("token")
    localStorage.removeItem("idusuario")
    localStorage.removeItem("persona")
    this.modalCtrl.dismiss();
    this.router.navigate(['login-estudiante']);
  }
}
