import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import validator from 'validator';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  sampleForm;
  usu = {
    email: "",
    pass: ""
  }
  constructor(private _loginService:LoginService) { }

  ngOnInit() {

  }
  loginForm = new FormGroup({
      userEmail: new FormControl(''),
      userPassword: new FormControl(''),
  });
    
  loginFormValidator = {
    userEmail: {
      empty: '',
    },
    userPassword: {
      empty: '',
    }
    };
  formValidator(): boolean {
      if (validator.isEmpty(this.loginForm.value.userEmail)) {
        this.loginFormValidator.userEmail.empty = 'Debe ingresar un correo';
          return false;
      } 
  
      if (validator.isEmpty(this.loginForm.value.userPassword)) {
        this.loginFormValidator.userPassword.empty = 'Ingrese una contraseña';
          return false;
      } else {
      this.loginFormValidator.userPassword.empty = '';
      }
        return true;
    }
    
    onSubmit() {
      if (this.formValidator()) {
        this._loginService.loginEstudiante(this.usu)
      }
    }
}
