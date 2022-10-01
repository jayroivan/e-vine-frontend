import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private url = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  $cerrarCarrito = new EventEmitter<boolean>();
  $crearOrden = new EventEmitter<boolean>();
  
  get(): Observable<Orden[]>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Orden[]>(`${this.url}/orden/todas`, {headers: httpHeaders});
  }

  getById(id?: string): Observable<Orden[]>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Orden[]>(`${this.url}/orden/todas/usuario/${id}`, {headers: httpHeaders});
  }

  getLastOrder(): Observable<Orden>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Orden>(`${this.url}/orden/obtenerultimaorden`, {headers: httpHeaders})
  }

  post(orden: Orden): Observable<Orden>{
    const httpHeaders = this.getHeaders();
    return this.http.post<Orden>(`${this.url}/orden/crear`, orden, {headers: httpHeaders});
  }

  put(id: string, orden: Orden): Observable<Orden>{
    const httpHeaders = this.getHeaders();
    return this.http.put<Orden>(`${this.url}/orden/actualizar/${id}`, orden, {headers: httpHeaders});
  }

  delete(id: string): Observable<Orden>{
    const httpHeaders = this.getHeaders();
    return this.http.delete<Orden>(`${this.url}/orden/eliminar/${id}`, {headers: httpHeaders});
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
