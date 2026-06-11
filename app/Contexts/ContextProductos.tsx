'use client'
import { createContext } from "react";
import { IProductos } from "../models/IProductos";

export const contextProductos = createContext({
    producto: [] as IProductos[],
    obtenerProductos: () => {},
    agregarProducto: (producto: IProductos, opcion: number) => {},
    eliminarProducto: (id: number) => {},
});