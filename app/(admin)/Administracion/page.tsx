'use client'

import { useState } from "react"
import { useContextProductos } from "@/app/Providers/ProvidersProductos"

export default function AdministracionProductos() {

  const { producto, desactivarProducto, agregarProducto } = useContextProductos()

  const [editando, setEditando] = useState<number | null>(null)

  const [form, setForm] = useState({
    nombre_producto: '',
    descripcion_product: '',
    marca: '',
    precio: '',
    stock: '',
    imagen_product: '',
    categoria: ''
  })

  const limpiarForm = () => {
    setForm({
      nombre_producto: '',
      descripcion_product: '',
      marca: '',
      precio: '',
      stock: '',
      imagen_product: '',
      categoria: '',
    })
    setEditando(null)
  }

  return (
    <main className="bg-black min-h-screen text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Administración de Productos
      </h1>

      {/* ================= FORM ================= */}
      <div className="bg-gray-800 p-6 mb-8 rounded space-y-4">

        <h2 className="text-xl font-bold mb-2">
          {editando ? "Editar producto" : "Crear producto"}
        </h2>

        <input
          className="w-full p-2 text-white rounded bg-gray-900 border border-gray-700"
          placeholder="Nombre"
          value={form.nombre_producto}
          onChange={(e) => setForm({ ...form, nombre_producto: e.target.value })}
        />

        <input
          className="w-full p-2 text-white bg-gray-900 border border-gray-700 rounded"
          placeholder="Descripcion"
          value={form.descripcion_product}
          onChange={(e) => setForm({ ...form, descripcion_product: e.target.value })}
        />

        <input
          className="w-full p-2 text-white rounded bg-gray-900 border border-gray-700"
          placeholder="Marca"
          value={form.marca}
          onChange={(e) => setForm({ ...form, marca: e.target.value })}
        />

        <input
          className="w-full p-2 text-white rounded bg-gray-900 border border-gray-700"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
        />

        <input
          className="w-full p-2 text-white rounded bg-gray-900 border border-gray-700"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <input
          className="w-full p-2 text-white rounded bg-gray-900 border border-gray-700"
          placeholder="Imagen URL"
          value={form.imagen_product}
          onChange={(e) => setForm({ ...form, imagen_product: e.target.value })}
        />

        {/* ================= CATEGORIA ================= */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-400 font-medium">
            Categoría
          </label>

          <select
            className="w-full p-2 text-white rounded bg-gray-900 border border-gray-700"
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="">Selecciona una categoría...</option>
            <option value="1">Videojuegos</option>
            <option value="2">Consolas</option>
            <option value="3">Accesorios</option>
            <option value="4">Próximos lanzamientos</option>
          </select>
        </div>

        {/* ================= BOTÓN ================= */}
        <div className="flex gap-2 pt-2">
          <button
            className={`px-4 py-2 rounded font-bold transition ${
              editando !== null
                ? "bg-green-600 hover:bg-green-500"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
            onClick={async () => {

              // 🔥 VALIDACIÓN BÁSICA
              if (
                !form.nombre_producto ||
                !form.descripcion_product ||
                !form.marca ||
                !form.precio ||
                !form.stock ||
                !form.categoria
              ) {
                alert("Completa todos los campos")
                return
              }

              const datos = {
                nombre_producto: form.nombre_producto,
                descripcion_product: form.descripcion_product,
                marca: form.marca,
                precio: Number(form.precio),
                stock: Number(form.stock),
                imagen_product: form.imagen_product,
                estado: 1,

                // 🔥 CLAVE REAL DEL FIX
                Categoria_idCategoria: Number(form.categoria)
              }

              if (editando !== null) {
                await agregarProducto(
                  { ...datos, idProductos: editando } as any,
                  2
                )
              } else {
                await agregarProducto(datos as any, 1)
              }

              limpiarForm()
            }}
          >
            {editando !== null ? "Guardar cambios" : "Crear producto"}
          </button>

          {editando !== null && (
            <button
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded transition"
              onClick={limpiarForm}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-lg">
        <table className="w-full bg-gray-950 text-sm text-left text-gray-300">

          <thead className="bg-gray-800 text-gray-200 uppercase text-xs">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Producto</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Marca</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Imagen</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">

            {producto.map((item) => (
              <tr key={item.idProductos} className="hover:bg-gray-900 transition">

                <td className="p-2">#{item.idProductos}</td>

                <td className="p-2">{item.nombre_producto}</td>

                <td className="p-2 text-gray-400 truncate max-w-xs">
                  {item.descripcion_product}
                </td>

                <td className="p-2">{item.marca}</td>

                <td className="p-2">
                  <span className="text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded">
                    {item.categoria?.nombre_categoria ||
                      `ID: ${item.categoria?.idCategoria || 'Sin cat.'}`}
                  </span>
                </td>

                <td className="p-2 text-emerald-400 font-bold">
                  L. {item.precio}
                </td>

                <td className="p-2">{item.stock}</td>

                <td className="p-2">
                  <img
                    src={item.imagen_product}
                    className="w-12 h-12 rounded"
                  />
                </td>

                <td className="p-2">
                  {item.estado === 1 ? (
                    <span className="text-green-400">Activo</span>
                  ) : (
                    <span className="text-red-400">Inactivo</span>
                  )}
                </td>

                {/* BOTONES */}
                <td className="p-2 text-center">

                  <button
                    onClick={() => {
                      setEditando(item.idProductos!)

                      setForm({
                        nombre_producto: item.nombre_producto,
                        descripcion_product: item.descripcion_product,
                        marca: item.marca,
                        precio: item.precio.toString(),
                        stock: item.stock.toString(),
                        imagen_product: item.imagen_product,
                        categoria: item.categoria?.idCategoria?.toString() || ''
                      })
                    }}
                    className="bg-blue-600 px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => desactivarProducto(item.idProductos!)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Desactivar
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </main>
  )
}