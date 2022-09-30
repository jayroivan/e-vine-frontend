import { Component, Inject, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from '../../models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario!: Usuario;
  usuarioForm: FormGroup;
  hide = true;  
  imagen:any;
  selected = new FormControl(0);
  actualizar = false;


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
      Telefono: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarDatos();
    console.log(this.usuario)
    
  }

  cargarDatos(){
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
      console.log(res)
    })
  }

  actualizaruser(){
    this.actualizar = true;
    console.log(this.usuario)
    this.usuarioForm.patchValue({
      _id: this.usuario._id,
      Usuario: this.usuario.usuario,
      Email: this.usuario.email,
      Clave: '',
      Telefono: this.usuario.telefono
    });

    this.selected.setValue(1);

  }

  actualizarUsuario(){
    this.usuario = {
      _id: this.usuarioForm.value._id,
      usuario: this.usuarioForm.value.Usuario,
      email: this.usuarioForm.value.Email,
      telefono: this.usuarioForm.value.Telefono,
      clave: this.usuarioForm.value.Clave
    }
    this.usuarioService.putusuario(this.usuario).subscribe((res)=>{
      if(res != null){
        Swal.fire({
          icon: 'success',
          title: 'Excelente!',
          text: 'Perfil actualizado con Exito!',
        })
      }
    })
    this.actualizar = false;
    this.cargarDatos();
    this.selected.setValue(0);
    this.ngOnInit();
  }


}
