import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['demo-nombre', 'demo-stock', 'demo-precio', 'demo-acciones'];
  dataSource = ELEMENT_DATA;
 

  constructor(
    public dialogRef: MatDialogRef<ProductoComponent>
  ) 
  {   }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  eliminarproducto() {  }

  actualizarproducto() {  }

}


export interface ElementosProductos {
  nombre: string;
  stock: number;
  precio: number;
}

const ELEMENT_DATA: ElementosProductos[] = [ ];
