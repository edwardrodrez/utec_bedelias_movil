import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import validator from 'validator';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.page.html',
  styleUrls: ['./login-estudiante.page.scss'],
})
export class LoginEstudiantePage implements OnInit {
  sampleForm;
  registroDTO = {
    nombre:      "",
    password:   ""
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
        this.loginFormValidator.userEmail.empty = 'Por Favor, Ingrese un usuario';
          return false;
      } else {
        this.loginFormValidator.userEmail.empty = '';
      }
  
      if (validator.isEmpty(this.loginForm.value.userPassword)) {
        this.loginFormValidator.userPassword.empty = 'Debe Ingresar una contraseña';
          return false;
      } else {
      this.loginFormValidator.userPassword.empty = '';
      }
        return true;
    }
    
    onSubmit() {
      if (this.formValidator()) {
        this._loginService.loginEstudiante(this.registroDTO)
      }
    }
}
