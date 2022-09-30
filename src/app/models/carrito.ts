import { Producto } from "./productos";

export interface Carrito {
    producto: Producto;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number
}