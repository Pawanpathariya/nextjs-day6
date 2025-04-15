// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const LineChart = () => {
  const { theme } = useTheme();

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-1/2">
      <Line data={data} />
    </div>
  );
};
export default LineChart;

