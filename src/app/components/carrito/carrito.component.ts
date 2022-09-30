import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  producto = {
    descripcion: 'Vino Venta',
    precio: '250',
    img: 'imagen de producto'
  }
  
  displayedColumns: string[] = ['producto', 'unitario', 'cantidad', 'subtotal'];
  dataSource = ELEMENT_DATA;

  constructor() { 
    
  }

  ngAfterContentInit(){
    render(
      {
        id: "#paypal",
        currency: "USD",
        value: "100.00",
        onApprove: (details) => {
          alert("Transaction Successfull")
        }
      }
    )
  }

  ngOnInit(): void {
    // paypal
    // .Buttons({
    //   createOrder: (data, actions) => {
    //     return actions.order.create({
    //       purchase__units: [{
    //         descripcion: this.producto.descripcion,
    //         amount: {
    //           currency_code: 'USD',
    //           value: this.producto.precio
    //         }
    //       }]
    //     })
    //   },
    //   onAprove: async (data, actions) => {
    //     const order = await actions.order.capture()
    //     console.log();
        
    //   }
    // })
    // .render(this.paypalElement.nativeElement);
  }

}
export interface CarritoElement {
  producto: string;
  unitario: number;
  cantidad: number;
  subtotal: number;
}
const ELEMENT_DATA: CarritoElement[] = [
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3}
];
