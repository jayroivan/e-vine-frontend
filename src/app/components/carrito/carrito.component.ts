import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { render} from 'creditcardpayments/creditCardPayments';
import jwt_decode from 'jwt-decode'
import { Carrito } from 'src/app/models/carrito';
import { Orden } from 'src/app/models/orden';
import { Usuario } from 'src/app/models/usuarios';
import { OrdenService } from 'src/app/services/orden.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  total: number = 0;
  orden!: Orden;
  usuario!: Usuario;
  carrito: Carrito [] = []
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal'];
  dataSource!: MatTableDataSource<Carrito>;

  constructor(
    private ordenService: OrdenService,
    private usuarioService: UsuariosService,
  ) { 
    
  }

  ngAfterContentInit(){
    render(
      {
        id: "#paypal",
        currency: "USD",
        value: this.total.toString(),
        onApprove: (details) => {
          alert("Transaction Successfull")
          this.orden = {
            numero: 0,
            usuario: this.usuario,
            total: this.total,
            detalle: this.carrito
          }
          this.ordenService.getLastOrder().subscribe((res) => {
            this.orden.numero = res.numero 
            this.ordenService.post(this.orden).subscribe((res) => {
              sessionStorage.removeItem('carrito');
              this.ordenService.$cerrarCarrito.emit(true);
            });       
          })                    
        }
      }
    )
  }

  ngOnInit(): void {
    this.CargarUsuario();
    this.CargarDatos();
    this.Total();
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
        console.log(this.usuario);
        
      });
    }
  }

  CargarDatos(){
    var local = sessionStorage.getItem('carrito');
    if(local == null){
      this.carrito = []
    }else{
      this.carrito = JSON.parse(local);
      console.log(this.carrito);
      this.dataSource = new MatTableDataSource(this.carrito);
    }
  }

  Total(){
    this.carrito.forEach((item) => {
      this.total += item.subtotal;
    })
  }

  Cancelar(){
    sessionStorage.removeItem('carrito');
    this.ordenService.$cerrarCarrito.emit(true);
  }

}
