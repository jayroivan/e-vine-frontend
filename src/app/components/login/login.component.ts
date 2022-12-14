import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  color: ThemePalette = 'accent';
  public usuario!: Usuario;
  usuarioForm: FormGroup;
  accessForm: FormGroup;
  loading = false;
  hide = true;  
  selected = new FormControl(0);

  constructor(
    private _builder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.usuarioForm = this._builder.group({
      Usuario: ['', Validators.required],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      Clave: ['', Validators.required],
      Telefono: ['', Validators.required]
    })

    this.accessForm = this._builder.group({
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      Clave: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  isAdmin(tokens: string){
    interface decodeToken {
      usuario: string;
      id: string;
      email: string;
      telefono: number;
      rol: string;
      exp: number;
      iat: number;

    }
    var decode = (jwt_decode<decodeToken>(tokens));
    var rol = decode['rol']
    this.usuarioService.getrol(rol, tokens).subscribe((res) =>{
      if (res.nombre === 'admin') {
        sessionStorage.setItem("isAdmin", JSON.stringify(true))
      } else {
        sessionStorage.setItem("isAdmin", JSON.stringify(false))
      }
    })
  }

  ingresar(){
    this.usuario = {
      email: this.accessForm.value.Email,
      clave: this.accessForm.value.Clave
    }

    this.usuarioService.login(this.usuario).subscribe((res) => {
      if(res.access_token){
        sessionStorage.setItem('token', JSON.stringify(res.access_token));
        sessionStorage.setItem('isAuthorized', JSON.stringify(true));
        this.isAdmin(JSON.stringify(res.access_token));
        this.fakeloading();
      }else {
        this.error();
      }
      
    },
    err => {
      console.log(err);
      this.error();
    })
  }

  registrar(){
    this.usuario = {
      usuario: this.usuarioForm.value.Usuario,
      email: this.usuarioForm.value.Email,
      telefono: this.usuarioForm.value.Telefono,
      clave: this.usuarioForm.value.Clave
    }

    this.usuarioService.post(this.usuario).subscribe((res)=> {
      if(res != null){
        this.selected.setValue(0);
      }else {
        this.error();
        this.usuarioForm.reset();
      }
    }, err => {
      this.error();
      this.usuarioForm.reset();
    })
  }

  fakeloading(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, (2000));
  }

  error(){
    this._snackBar.open('Correo Electronico o contrase??a ingresado son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
