import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/productos';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ModificarComponent } from './modificar/modificar.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['demo-nombre', 'demo-stock', 'demo-precio', 'demo-acciones'];
  dataSource = ELEMENT_DATA;
  productoFomr: FormGroup;
  categorias: Categoria[] = [];
  producto!: Producto;
  udtproducto!: Producto;
  imagen:any;
  selected = new FormControl(0);
  modalSwitch: boolean = false;

  constructor(
    private _builder: FormBuilder,
    public dialogRef: MatDialogRef<ProductoComponent>,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private firebaseService: FirebaseService
  ) 
  {   
    this.productoFomr = this._builder.group({
      Nombre: ['', Validators.required],
      Cosecha: ['', Validators.required],
      Stock: ['', Validators.required],
      Precio: ['', Validators.required],
      Categoria: ['', Validators.required],
      Imagen: ['']
    });
  }

  openDialog(producto: Producto) {
    this.modalSwitch = true;
    this.udtproducto = producto;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.imagen = undefined;
    this.CargarDatos();
    this.productoService.$cerrarModal.subscribe((res) => {
      if(res == true){
        this.modalSwitch = false;
        this.ngOnInit();
      }
    })
  }

  CargarDatos(){
    this.productoService.get().subscribe((res) => {
      this.dataSource = res;
    });
    this.categoriaService.allcategorias(sessionStorage.getItem('token')!).subscribe((res) => {
      this.categorias = res;
    })

  
  }

  obtenerImagen(event: any){
    let imagen = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(imagen[0]);
    reader.onloadend = () => {
      this.imagen = reader.result;
    }
  }

  GuardarProducto(){
    this.producto = {
      nombre: this.productoFomr.value.Nombre,
      cosecha: this.productoFomr.value.Cosecha,
      precio: this.productoFomr.value.Precio,
      stock: this.productoFomr.value.Stock,
      categoria: this.productoFomr.value.Categoria,
    }
    this.firebaseService.subirImagen(`${this.producto.nombre}_${Date.now()}`, this.imagen).then((res) => {
      if(res != null){
        this.producto.imagen = res;
        this.productoService.post(this.producto).subscribe((res) => {
          this.selected.setValue(0);
          this.ngOnInit();
          this.productoService.$refreshProductos.emit(true);          
          this.productoFomr.reset();
        });
      }
    },
    error => {
      console.log(error);
    })
  }

  eliminarproducto(id: string) { 
    this.productoService.delete(id).subscribe((res) => {
      if(res != null){
        this.productoService.$refreshProductos.emit(true);
        this.ngOnInit();
      }
    })
   }

}

export interface ElementosProductos {
  nombre: string;
  stock: number;
  precio: number;
}

const ELEMENT_DATA: ElementosProductos[] = [ ];