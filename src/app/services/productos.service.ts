import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Categoria } from "../models/categoria";

@Injectable({
    providedIn: 'root'
  })
export class ProductoService{
    private url = environment.apiURL;
    
    constructor(private http: HttpClient) 
    {}

    postcategoria(categoria: Categoria, tokens: string): Observable<Categoria>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokens.replace(/['"]+/g, '')}`)
        return this.http.post<Categoria>(`${this.url}/categoria/crear`, categoria, { headers: headers});
      }

    allcategorias(tokens: string): Observable<Categoria[]>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokens.replace(/['"]+/g, '')}`);
        return this.http.get<Categoria[]>(`${this.url}/categoria/todos`, {headers: headers})
    }
}