import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar, ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/productos';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaComponent } from '../categoria/categoria.component';

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

  mode: ProgressBarMode = 'indeterminate';
  loading = false;
  notificacion = false;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ObtenerUsuario();
    this.CargarDatos();
    this.productoService.$notificacion.subscribe((res)=> {
      if(res){
        this.notificacion = res;
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
      data: { id: producto._id, nombre: producto.nombre, cosecha: producto.cosecha, precio: producto.precio, stock: producto.stock, categoria: producto.categoria, nombrecategoria: producto.nombrecategoria},
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
  
  buscar() {  }

  detalle(){
    this.router.navigate(["/detalles"]);
  }

}

@Component({
  selector: './dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  selected = 0.00;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    private productoService: ProductoService
  ) {}

  AddCarrito(producto:Producto){
    this.productoService.$notificacion.emit(true);
    this.onNoClick()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
