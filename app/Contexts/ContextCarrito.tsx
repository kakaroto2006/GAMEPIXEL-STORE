'use client'

import React, { createContext, useEffect, useState } from 'react'
import { ICarritoDetalle } from '../models/ICarritoDetalle'
import { IProductos } from '../models/IProductos'

export const contextCarrito = createContext({
  carrito: [] as ICarritoDetalle[],
  agregarCarrito: (producto: IProductos) => {},
  obtenerProductosCarrito: () => {},
  eliminarDelCarrito: (id: number) => {},
  actualizarCantidad: (id: number, cant: number) => {},
})