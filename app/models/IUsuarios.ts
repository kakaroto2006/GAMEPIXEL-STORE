export interface IUsuarios {
    idUsuarios?: number;
    nombre_Usuario: string;
    correo_Usuario: string
    contrasenia_Usuario: string;
    rol: 'usuario' | 'administrador';
    estado_Usuario: boolean;
}