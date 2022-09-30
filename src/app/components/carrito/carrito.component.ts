import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { render} from 'creditcardpayments/creditCardPayments';
import { Carrito } from 'src/app/models/carrito';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  total: number = 0;
  orden!: Orden;
  carrito: Carrito [] = []
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal'];
  dataSource!: MatTableDataSource<Carrito>;

  constructor(
    private ordenService: OrdenService,
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
            numero: 1,
            total: this.total,
            detalle: this.carrito
          }
          this.ordenService.post(this.orden).subscribe((res) => {
            sessionStorage.removeItem('carrito');
            this.ordenService.$cerrarCarrito.emit(true);
          })
        }
      }
    )
  }

  ngOnInit(): void {
    this.CargarDatos();
    this.Total();
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
