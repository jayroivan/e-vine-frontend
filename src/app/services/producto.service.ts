import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Producto[]>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Producto[]>(`${this.url}/producto/todos`, {headers: httpHeaders})
  }

  getHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if(token){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + JSON.parse(token));
      httpHeaders = httpHeaders.append('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
      httpHeaders = httpHeaders.append('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    }

    return httpHeaders;
  }
}
