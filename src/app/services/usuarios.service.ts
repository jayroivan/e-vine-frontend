import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: Usuario): Observable<any>{
    return this.http.post<any>(`${this.url}/auth/login`, usuario);
  }

  getuno(id: string): Observable<Usuario>{
    const httpHeaders = this.getHeaders();
    return this.http.get<Usuario>(`${this.url}/usuario/buscaruno`+ id, {headers: httpHeaders})
  }

  post(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/usuario/crear`, usuario);
  }

  getrol(id: string, tokens:string): Observable<Rol>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokens.replace(/['"]+/g, '')}`);
    return this.http.get<Rol>(`${this.url}/rol/buscaruno${id}`, {headers: headers})
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
