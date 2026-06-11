import { ICategoria } from "./ICategoria";

export interface IProductos {
    idProductos?: number    ;
    nombre_producto: string;
    precio: number;
    descripcion_product: string;
    stock: number;
    estado: boolean;
    marca: string;
    imagen_product: string;
    categoria?: ICategoria;
}