import { IUsuarios } from "./IUsuarios"

export interface IResenia {
    idResenia: number
    nombre_resenia: string
    comentario: string
    calificacion: number
    fecha_comentario: string
    usuario?: IUsuarios
}