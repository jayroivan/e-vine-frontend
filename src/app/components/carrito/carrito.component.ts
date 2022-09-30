import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  displayedColumns: string[] = ['producto', 'unitario', 'cantidad', 'subtotal'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
    
  }

}
export interface CarritoElement {
  producto: string;
  unitario: number;
  cantidad: number;
  subtotal: number;
}
const ELEMENT_DATA: CarritoElement[] = [
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
  {producto: 'vino', unitario: 1 , cantidad: 3 , subtotal: 3},
];
