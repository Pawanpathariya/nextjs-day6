import Chart from 'chart.js/auto';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Paichart() {
  const canvas = useRef(null);
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(ctx);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Tablet', 'Laptop', 'Mobile', 'Shoes', 'Cloth'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [12, 19, 3, 2, 3],
            backgroundColor: isDark
              ? [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ]
              : [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)',
                ],
            borderColor: isDark
              ? [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ]
              : [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)',
                ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: isDark ? 'white' : 'black',
            },
          },
          title: {
            display: true,
            text: 'Number of products sold',
            color: isDark ? 'white' : 'black',
          },
        },
        maintainAspectRatio: false,
      },
    });
  }, [isDark]);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  return (
    <canvas
      ref={canvas}
      id="myChart"
      style={{ width: '550px', height: '300px' }}
    />
  );
}

