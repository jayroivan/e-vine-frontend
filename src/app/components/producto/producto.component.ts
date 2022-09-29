import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['demo-nombre', 'demo-stock', 'demo-precio', 'demo-acciones'];
  dataSource = ELEMENT_DATA;
  productoFomr: FormGroup;
  updproductoForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<ProductoComponent>,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
  ) 
  {   
    this.productoFomr = this._builder.group({

    });
    this.updproductoForm = this._builder.group({

    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.CargarDatos();
  }

  CargarDatos(){
    this.productoService.get().subscribe((res) => {
      this.dataSource = res;
    });
    this.categoriaService.allcategorias(sessionStorage.getItem('token')!).subscribe((res) => {
      this.categorias = res;
    })
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
