// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import 'chart.js/auto';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});
const data = {
  labels: ['Laptop', 'Tablet', 'Mobile', 'Shoes', 'Cloth', 'Accessories'],
  datasets: [
    {
      label: 'Product Sales',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        width: '600px',
        height: '700px',
        backgroundColor: theme === 'dark' ? '#111827' : '#FFFFFF',
      }}
    >
      <Bar data={data} options={{ plugins: { legend: { labels: { color: theme === 'dark' ? '#FFFFFF' : '#000000' } } } }} />
    </div>
  );
};
export default BarChart;

