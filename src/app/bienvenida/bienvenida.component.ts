import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
})
export class BienvenidaComponent {

  constructor(private router: Router) { 
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    setTimeout(() => {
       this.router.navigate(["login-estudiante"]);
    }, 4000);
   }
}
