import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bienvenid-estudiante',
  templateUrl: './bienvenid-estudiante.page.html',
  styleUrls: ['./bienvenid-estudiante.page.scss'],
})
export class BienvenidEstudiantePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["login-estudiante"]);
   }, 6000);
  }

}
