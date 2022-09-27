import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/models/categoria';
import { ProductoService } from '../../services/productos.service'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  color: ThemePalette = 'accent';
  public categoria!: Categoria;
  categoriaForm: FormGroup;
  loading = false;
  hide = true;  
  selected = new FormControl(0);
  dataSource!: MatTableDataSource<Categoria>;
  displayedColumns = ['nombre', 'descripcion' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaComponent>,
    private productoService: ProductoService
     )
   {
    this.productoService.allcategorias(sessionStorage.getItem('token')!).subscribe((categorias) => {
      this.dataSource = new MatTableDataSource(categorias);
      console.log(categorias)
    });

    this.categoriaForm = this._builder.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required]
    })

   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  registrarCategoria(){
    this.categoria = {
      nombre: this.categoriaForm.value.Nombre,
      descripcion: this.categoriaForm.value.Descripcion
    }

    this.productoService.postcategoria(this.categoria, sessionStorage.getItem('token')!).subscribe((res)=> {
      console.log(res);
      if(res != null){
        this.selected.setValue(0);
      }else {
        this.categoriaForm.reset();
      }
    }, err => {
      this.categoriaForm.reset();
    })
  }

  

}
