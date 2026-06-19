'use client'
import { createContext } from "react";
import { IProductos } from "../models/IProductos";

export const contextProductos = createContext({
    producto: [] as IProductos[],
    obtenerProductos: () => {},
    obtenerProductoPorId: (id: number | string): any => {},
    agregarProducto: (producto: IProductos, opcion: number) => {},
    desactivarProducto: (id: number) => {},
    categoriaActiva: 'Todas',
    setCategoriaActiva: (cat: string) => {}
});