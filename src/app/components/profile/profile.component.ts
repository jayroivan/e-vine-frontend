import { Component, Inject, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from '../../models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario!: Usuario;
  usuarioForm: FormGroup

  constructor(
    private usuarioService: UsuariosService,
    private _builder: FormBuilder,
    public dialog: MatDialog,

  ) { 
    this.usuarioForm = this._builder.group({
      _id: ['', Validators.required],
      Usuario: ['', Validators.required],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      Clave: ['', Validators.required],
      Telefono: ['', Validators.required],
      Imagen: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    interface decodeToken {
      usuario: string;
      id: string;
      email: string;
      telefono: number;
      rol: string;
      exp: number;
      iat: number;

    }
    var decode = (jwt_decode<decodeToken>(sessionStorage.getItem('token')!));
    this.usuarioService.getuno(decode['id']).subscribe((res) => {
      this.usuario = res;
      console.log(this.usuario)
    })
  }

  openDialogUsuario(){
  }


}
