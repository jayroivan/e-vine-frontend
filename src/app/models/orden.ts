import { Carrito } from "./carrito";

export interface Orden {
    _id?: string;
    numero: number;
    total: number;
    detalle: Carrito[];
}