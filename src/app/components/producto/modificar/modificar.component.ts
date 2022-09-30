import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/productos';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  productoForm: FormGroup;
  udtproducto!: Producto;
  categorias: Categoria[] = [];
  imagen: any;

  @Input() producto!: Producto

  constructor(
    private productoService: ProductoService,
    private _builder: FormBuilder,
    private categoriaService: CategoriaService,
    private firebaseService: FirebaseService
    ) { 
      this.productoForm = this._builder.group({
        Id: [''],
        Nombre: ['', Validators.required],
        Cosecha: ['', Validators.required],
        Stock: ['', Validators.required],
        Precio: ['', Validators.required],
        Categoria: ['', Validators.required],
        Imagen: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.CargarCategoria();
    this.CargarDatos();
  }

  getCategoria(id: string){
    this.categoriaService.getById(id, sessionStorage.getItem('token')!).subscribe((res)=> {
      return res;
    })
  }

  CargarCategoria(){
    this.categoriaService.allcategorias(sessionStorage.getItem('token')!).subscribe((res) => {
      this.categorias = res;
    });
  }

  CargarDatos(){
    console.log(this.producto);
    this.productoForm.patchValue({
      Id: this.producto._id,
      Nombre: this.producto.nombre,
      Cosecha: this.producto.cosecha,
      Stock: this.producto.stock,
      Precio: this.producto.precio,
      Categoria: this.producto.categoria?._id,
      Imagen: this.producto.imagen
    });    
  }

  obtenerImagen(event: any){
    let imagen = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(imagen[0]);
    reader.onloadend = () => {
      this.imagen = reader.result;
    }
  }

  Actualizar(){
    this.udtproducto = {
      _id: this.productoForm.value.Id,
      cosecha: this.productoForm.value.Cosecha,
      nombre: this.productoForm.value.Nombre,
      precio: this.productoForm.value.Precio,
      stock: this.productoForm.value.Stock,
      categoria: this.productoForm.value.Categoria,
      imagen: this.productoForm.value.Imagen
    }
    if(this.imagen == undefined){
      this.productoService.put(this.udtproducto._id!, this.udtproducto).subscribe((res) => {
        this.productoService.$refreshProductos.emit(true);
        this.productoService.$cerrarModal.emit(true);
      })
    }else{
      this.firebaseService.subirImagen(`${this.udtproducto.nombre}_${Date.now()}`, this.imagen).then((res) => {
        if(res != null){
          this.udtproducto.imagen = res;
          this.productoService.put(this.udtproducto._id!, this.udtproducto).subscribe((res) => {
            this.productoService.$refreshProductos.emit(true);
            this.productoService.$cerrarModal.emit(true);
          })
        }
      })
    }    
  }

}
