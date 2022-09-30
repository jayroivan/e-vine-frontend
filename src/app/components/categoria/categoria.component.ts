import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import Swal from 'sweetalert2';

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
  actualizar = false;
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
    this.categoriaService.allcategorias(sessionStorage.getItem('token')!).subscribe((categorias) => {
      this.dataSource = new MatTableDataSource(categorias);
    });
  }

  onRowClicked(row: any) {
    this.actualizar = true,
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
        Swal.fire({
          icon: 'success',
          title: 'Excelente!',
          text: 'Creado con Exito!',
        })
        this.ngOnInit();
        this.categoriaForm.reset();
        this.selected.setValue(0);
      }else {
        this.categoriaForm.reset();
      }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar',
      })
      this.categoriaForm.reset();
    })
  }

  eliminarCategoria(row: Categoria){    
    this.categoriaService.delete(row._id!.toString()).subscribe((res) =>{
    if (res =! null) {
      Swal.fire({
        icon: 'success',
        title: 'Excelente!',
        text: 'Eliminado con Exito!',
      })
      this.ngOnInit();
    }
  })

  }

  actualizarCategoria(){
    let message = {}
    this.categoria = {
    _id: this.AcategoriaForm.value._id,
    nombre: this.AcategoriaForm.value.ANombre,
    descripcion: this.AcategoriaForm.value.ADescripcion,
    }
    this.categoriaService.update(this.categoria).subscribe((res) => {
    if (res) {
      Swal.fire({
        icon: 'success',
        title: 'Excelente!',
        text: 'Actualizado con Exito!',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar',
      })
    }
  })
    this.actualizar = false,
    this.ngOnInit(),
    this.selected.setValue(0)
  }
}

