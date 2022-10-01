import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Orden } from 'src/app/models/orden';
import jwt_decode from 'jwt-decode'
import { OrdenService } from 'src/app/services/orden.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuarios';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  ordenes: Orden[] = [];
  usuario!: Usuario;

  displayedColumns: string[] = ['demo-numero', 'demo-fecha', 'demo-total', 'demo-usuario'];
  dataSource!: MatTableDataSource<Orden>;
  constructor(
    private usuarioService: UsuariosService,
    private ordenService: OrdenService
  ) { }

  ngOnInit(): void {
    this.CargarUsuario();    
  }

  CargarUsuario(){
    interface decodeToken {
      usuario: string;
      id: string;
      email: string;
      telefono: number;
      rol: string;
      exp: number;
      iat: number;

    }
    var token = sessionStorage.getItem('token');
    if(token){
      var decode = (jwt_decode<decodeToken>(token))
      this.usuarioService.getuno(decode['id']).subscribe((res) => {
        this.usuario = res; 
        this.CargarDatos();  
      });
    }
  }

  CargarDatos(){
    var admin = this.isAdmin();
    if(admin == 'true'){
      this.ordenService.get().subscribe((res) => {
        this.ordenes = res;  
        this.dataSource = new MatTableDataSource(this.ordenes);
      })
    }else{
      this.ordenService.getById(this.usuario._id).subscribe((res) => {
        console.log(res);
        
        this.ordenes = res;
        this.dataSource = new MatTableDataSource(this.ordenes);
      })
    }    
  }

  isAdmin(){
    return sessionStorage.getItem('isAdmin')
  }

}
