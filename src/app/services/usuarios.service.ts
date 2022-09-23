import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  post(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/usuario/crear`, usuario);
  }
}
