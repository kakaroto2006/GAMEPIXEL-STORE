import axios from "axios";

const API_URL = 'http://localhost:8080'; 

export const registrarPago = async (datosCompra: any) => {
    const response = await axios.post(`${API_URL}/pagar`, datosCompra);
    return response.data;
}

export const getDatosGraficaVentas = async () => {
    const response = await axios.get(`${API_URL}/grafica-ventas`);
    return response.data; 
}

export const getDatosGraficaProductos = async () => {
        const response = await axios.get(`${API_URL}/grafica-stock`);
        return response.data; 

}