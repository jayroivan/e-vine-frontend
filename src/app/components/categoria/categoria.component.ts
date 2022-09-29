import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from '../../services/categoria.service'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  color: ThemePalette = 'accent';
  public categoria!: Categoria;
  categoriaForm: FormGroup;
  AcategoriaForm: FormGroup
  loading = false;
  hide = true;  
  selected = new FormControl(0);
  dataSource!: MatTableDataSource<Categoria>;
  displayedColumns = ['nombre', 'descripcion', 'Acciones' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaComponent>,
    private categoriaService: CategoriaService
     )
   {
    this.categoriaService.allcategorias(sessionStorage.getItem('token')!).subscribe((categorias) => {
      this.dataSource = new MatTableDataSource(categorias);
      console.log(categorias)
    });

    this.categoriaForm = this._builder.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required]
    })
    this.AcategoriaForm = this._builder.group({
      _id: ['', Validators.required],
      ANombre: ['', Validators.required],
      ADescripcion: ['', Validators.required]
    })

   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onRowClicked(row: any) {
    this.AcategoriaForm.setValue({
      _id: row._id,
      ANombre: row.nombre,
      ADescripcion: row.descripcion
    })
    this.selected.setValue(2);
  }

  registrarCategoria(){
    this.categoria = {
      nombre: this.categoriaForm.value.Nombre,
      descripcion: this.categoriaForm.value.Descripcion
    }

    this.categoriaService.postcategoria(this.categoria, sessionStorage.getItem('token')!).subscribe((res)=> {
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

  eliminarCategoria(row: Categoria){    
    this.categoriaService.delete(row._id!.toString()).subscribe((res) =>
    console.log(res)
    )

  }

  actualizarCategoria(){
    this.categoria = {
    _id: this.AcategoriaForm.value._id,
    nombre: this.AcategoriaForm.value.ANombre,
    descripcion: this.AcategoriaForm.value.ADescripcion,
    }
    this.categoriaService.update(this.categoria).subscribe((res) => 
    console.log(res)
    )
    this.selected.setValue(0)
  }
}

