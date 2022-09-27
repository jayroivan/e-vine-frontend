import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  loading = false;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ObtenerUsuario();
  }


  ObtenerUsuario(){
    let result = sessionStorage.getItem('isAuthorized')
    if(result){
      this.isAuthenticated = true;
    }

  }

  obtenerRol(){
    return sessionStorage.getItem('isAdmin')
  }

  Logout(){
    sessionStorage.clear();
    this.router.navigate(['/logout']);
  }

<<<<<<< HEAD
  openDialog(): void {
    const dialogRef = this.dialog.open(CategoriaComponent, {
      width: '600px',
      data: { name: this.name, color: this.color }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
=======
  buscar() {  }

  detalle(){
    this.router.navigate(["/detalles"]);
>>>>>>> 54c630e4185beaed4041d621db25d86ac9919750
  }

}
