import { createContext } from 'react';
import { IFavoritos } from '../models/IFavoritos';
import { IProductos } from '../models/IProductos';

export const contextFavoritos = createContext({
  favoritos: [] as IFavoritos[],
  agregarAFavoritos: (producto: IProductos) => {},
  obtenerFavoritos: () => {},
  eliminarFavorito: (idFavorito: number) => {},
});