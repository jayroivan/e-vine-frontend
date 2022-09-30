import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  displayedColumns: string[] = ['demo-numero', 'demo-fecha', 'demo-total', 'demo-usuario'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
export interface OrdenElement {
  numero: number;
  fecha: number;
  total: number;
  usuario: string;
}
const ELEMENT_DATA: OrdenElement[] = [
  
];
