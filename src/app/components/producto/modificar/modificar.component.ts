import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/productos';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  categorias: Categoria[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: Producto ) { }

  ngOnInit(): void {
  }

}
