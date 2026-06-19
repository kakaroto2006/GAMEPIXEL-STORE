import { ICarrito } from "./ICarrito";
import { IProductos } from "./IProductos";

export interface ICarritoDetalle{
    idDetalle_carrito: number;
    cantidad: number;
    Carrito: ICarrito
    producto:IProductos;
}


    