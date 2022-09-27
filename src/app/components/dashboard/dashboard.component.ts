import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar, ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/productos';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAuthenticated: boolean = false;
  productos: Producto[] = []
  producto!: Producto;
  search: FormControl = new FormControl(''); 

  mode: ProgressBarMode = 'determinate';

  constructor(
    private router: Router,
    private productoService: ProductoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ObtenerUsuario();
    this.CargarDatos();
  }

  ObtenerUsuario(){
    let result = sessionStorage.getItem('isAuthorized')
    if(result){
      this.isAuthenticated = true;
    }    
  }

  CargarDatos(){
    this.productoService.get().subscribe((res) => {
      this.productos = res;
    })
  }

  openDialog(producto:Producto): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { id: producto._id, nombre: producto.nombre, cosecha: producto.cosecha, precio: producto.precio, stock: producto.stock, categoria: producto.categoria},
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

  ChangeAnimation(){
    this.mode = "indeterminate"
  }

  Logout(){
    sessionStorage.clear();
    this.router.navigate(['/logout']);
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
  ) {}

  AddCarrito(producto:Producto){

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
