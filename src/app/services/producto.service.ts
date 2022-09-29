import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

  $notificacion = new EventEmitter<boolean>();

  get(): Observable<Producto[]>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Producto[]>(`${this.url}/producto/todos`, {headers: httpHeaders});
  }

  getById(id: string): Observable<Producto>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Producto>(`${this.url}/producto/obtenerUno/${id}`)
  }

  post(producto: Producto): Observable<Producto>{
    const httpHeaders = this.getHeaders();
    return this.http.post<Producto>(`${this.url}/producto/crear`, producto, {headers: httpHeaders});
  }

  put(id:string, producto: Producto): Observable<Producto>{
    const httpHeaders = this.getHeaders();
    return this.http.put<Producto>(`${this.url}/producto/actualizar/${id}`, producto, {headers: httpHeaders});
  }

  delete(id: string): Observable<Producto>{
    const httpHeaders = this.getHeaders();
    return this.http.delete<Producto>(`${this.url}/producto/eliminar/${id}`);
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
