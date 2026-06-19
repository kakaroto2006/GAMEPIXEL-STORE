'use client'

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataGrafica {
  fecha: string;
  totalVendido: string;
}

export default function ReporteVentas() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    async function cargarEstadisticas() {
      try {
        const res = await fetch('http://localhost:8080/api/datos-grafica');
        const data: DataGrafica[] = await res.json();

        setChartData({
          labels: data.map(item => item.fecha),
          datasets: [
            {
              label: 'Ventas Diarias (L.)',
              data: data.map(item => parseFloat(item.totalVendido)),
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
              borderColor: 'rgb(34, 197, 94)',
              borderWidth: 1,
            }
          ]
        });
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    cargarEstadisticas();
  }, []);

  return (
    <section className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-2xl w-full max-w-4xl mx-auto my-10">
      <h2 className="text-xl font-bold text-white mb-6">Historial de Ganancias</h2>
      
      <div className="w-full h-[300px] md:h-[400px]">
        {chartData ? (
          <Bar 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
                x: { ticks: { color: '#9ca3af', maxRotation: 45, minRotation: 45 }, grid: { display: false } }
              },
              plugins: {
                legend: { position: 'top', labels: { color: '#fff' } }
              }
            }} 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Cargando estadísticas...
          </div>
        )}
      </div>
    </section>
  );
}