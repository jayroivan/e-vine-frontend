import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  ingresar(){
    this.usuario = {
      email: this.accessForm.value.Email,
      clave: this.accessForm.value.Clave
    }

    this.usuarioService.login(this.usuario).subscribe((res) => {
      //console.log(res.access_token)
      if(res.access_token){
        sessionStorage.setItem('token', JSON.stringify(res));
        sessionStorage.setItem('isAuthorized', JSON.stringify(true));
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
      console.log(res);
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
    this._snackBar.open('Correo Electronico o contraseña ingresado son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
