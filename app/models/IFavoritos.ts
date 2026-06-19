import { IProductos } from './IProductos';

export interface IFavoritos {
    idFavoritos: number;
    fecha_agregada: string;
    Usuarios_idUsuarios: number;
    Productos_idProductos: number;
    producto?: IProductos; 
}