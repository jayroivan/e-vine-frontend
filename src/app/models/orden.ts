import { Carrito } from "./carrito";

export interface Orden {
    _id?: string;
    numero: string;
    total: number;
    detalle: Carrito;
}