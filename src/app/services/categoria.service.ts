import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Categoria } from "../models/categoria";

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService {
    private url = environment.apiURL;
    
    constructor(private http: HttpClient) 
    {}

    postcategoria(categoria: Categoria, tokens: string): Observable<Categoria>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokens.replace(/['"]+/g, '')}`)
        return this.http.post<Categoria>(`${this.url}/categoria/crear`, categoria, { headers: headers});
      }

    getById(id: string, token: string): Observable<Categoria>{
      return this.http.get<Categoria>(`${this.url}/categoria/obtenerUno/${id}`);
    }

    allcategorias(tokens: string): Observable<Categoria[]>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokens.replace(/['"]+/g, '')}`);
        return this.http.get<Categoria[]>(`${this.url}/categoria/todos`, {headers: headers})
    }

    delete(id: string){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`)
      return this.http.delete(`${this.url}/categoria/eliminar/`+ `${id}`, {headers: headers})
    }

    update(categoria: Categoria): Observable<Categoria>{

      const headers = new HttpHeaders().set('Authorization', `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`)
      return this.http.put<Categoria>(`${this.url}/categoria/actualizar/`+ `${categoria._id}`, categoria, {headers: headers})
    }
}