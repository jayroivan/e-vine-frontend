import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { Producto } from 'src/app/models/productos';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaComponent } from '../categoria/categoria.component';
import { OrdenComponent } from '../orden/orden.component';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string | undefined;
  color: string | undefined;

  isAuthenticated: boolean = false;
  productos: Producto[] = []
  producto!: Producto;
  search: FormControl = new FormControl(''); 
  carrito: boolean = false;
  profile: boolean = false;

  mode: ProgressBarMode = 'indeterminate';
  loading = false;
  notificacion = false;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private ordenService: OrdenService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ObtenerUsuario();
    this.CargarDatos();
    this.productoService.$notificacion.subscribe((res)=> {
      if(res){
        this.notificacion = res;
      }
    });
    this.productoService.$refreshProductos.subscribe((res)=> {
      if(res){
        this.ngOnInit();
      }
    });
    this.ordenService.$cerrarCarrito.subscribe((res) => {
      if(res){
        this.carrito = false;
      }
    })
  }

  ObtenerUsuario(){
    let result = sessionStorage.getItem('isAuthorized')
    if(result){
      this.isAuthenticated = true;
    }    
  }

  isAdmin(){
    return sessionStorage.getItem('isAdmin')
  }

  CargarDatos(){
    this.productoService.get().subscribe((res) => {
      this.productos = res;
    })
  }

  openDialogProducto(producto:Producto): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: { id: producto._id, nombre: producto.nombre, cosecha: producto.cosecha, precio: producto.precio, stock: producto.stock, categoria: producto.categoria?.nombre },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.producto = result;
    });
  }

  ObtenerVino(){

  }

  obtenerRol(){
    return sessionStorage.getItem('isAdmin')
  }

  ChangeAnimation(boolean: boolean, id?: string){
    const progress = document.getElementById(`${id}`)

    if(boolean == true && progress?.id == id){
      progress?.classList.add('mat-progress-hover')
      this.mode = "indeterminate"
    } else{
      progress?.classList.remove('mat-progress-hover')
      this.mode = "determinate"
    }
    
  }

  Logout(){
    sessionStorage.clear();
    this.router.navigate(['/logout']);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CategoriaComponent, {
      width: '800px',
      data: { name: this.name, color: this.color }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  openProducto(){
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '800px',
      data: { name: this.name, color: this.color}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  openOrden(){
    const dialogRef = this.dialog.open(OrdenComponent, {
      width: '800px',
      data: { name: this.name, color: this.color}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }
  
  buscar() {  }

  detalle(){
    this.router.navigate(["/detalles"]);
  }

  Home(){
    this.profile = false;
    this.carrito = false;
  }

  Carrito(){
    this.profile = false;
    this.carrito = true;
    this.notificacion = false;
  }

  Profile(){
    this.carrito = false;
    this.profile = true;
  }

}

@Component({
  selector: './dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  selected = 0.00;
  carrito!: Carrito;
  carritos: Carrito[] = [];
  carritoForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productoService: ProductoService,
    private _builder: FormBuilder
  ) {
    this.carritoForm = this._builder.group({
      Cantidad: ['', Validators.required]
    })
  }

  AddCarrito(){
    this.carrito = {
      producto: this.data,
      nombre: this.data.nombre,
      cantidad: this.carritoForm.value.Cantidad,
      precio: this.data.precio,
      subtotal: parseFloat((this.data.precio*this.carritoForm.value.Cantidad).toFixed(2))
    }    

    var local = sessionStorage.getItem('carrito');
    if(local == null){
      this.carritos.push(this.carrito);
      sessionStorage.setItem('carrito', JSON.stringify(this.carritos));
    }else{
      this.carritos = JSON.parse(local);
      this.carritos.push(this.carrito);
      sessionStorage.setItem('carrito', JSON.stringify(this.carritos));
    }
    this.productoService.$notificacion.emit(true);
    this.onNoClick()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
