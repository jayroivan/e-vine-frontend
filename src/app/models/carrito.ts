import { Producto } from "./productos";

export interface Carrito {
    producto?: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number
}