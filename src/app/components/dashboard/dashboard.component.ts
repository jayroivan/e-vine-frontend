import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private router: Router
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

}
