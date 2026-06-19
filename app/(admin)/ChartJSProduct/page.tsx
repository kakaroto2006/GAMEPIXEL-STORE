'use client';
import React, { useState, useEffect } from 'react';
import { getDatosGraficaProductos } from '@/app/servicios/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GraficaProductosTop() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    getDatosGraficaProductos().then((data) => {
      if (data && data.length > 0) {
        setChartData({
          labels: data.map((item: any) => item.nombre_producto),
          datasets: [{
            label: 'Unidades en Stock',
            data: data.map((item: any) => item.stock),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgb(37, 99, 235)',
            borderWidth: 1
          }]
        });
      }
    });
  }, []);

  return (
    <section className="bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-800 w-full">
      <h3 className="text-white font-bold mb-6">Stock de Productos</h3>
      
      <div className="w-full h-300px md:h-75">
        {chartData ? (
          <Bar 
            data={chartData} 
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { ticks: { color: '#9ca3af', font: { size: 11 } } },
                x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } }
              },
              plugins: {
                legend: { position: 'top', labels: { color: '#fff' } }
              }
            }} 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Cargando datos...
          </div>
        )}
      </div>
    </section>
  );
}