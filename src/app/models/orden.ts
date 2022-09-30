import { Carrito } from "./carrito";
import { Usuario } from "./usuarios";

export interface Orden {
    _id?: string;
    numero: number;
    total: number;
    detalle: Carrito[];
    usuario: Usuario;
}