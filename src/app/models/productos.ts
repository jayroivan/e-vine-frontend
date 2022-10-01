import { Categoria } from "./categoria";

export interface Producto {
    _id?: string;    
    nombre: string;
    precio: number;
    cosecha: number;
    stock: number;
    categoria?: Categoria;
    imagen?: string;
}