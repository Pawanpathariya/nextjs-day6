import React from 'react';
import { useTheme } from 'next-themes';

const timelineData = [
  {
    year: '2010',
    title: 'Company Started',
    description: 'Our company was founded in 2010 by a group of entrepreneurs.',
  },
  {
    year: '2012',
    title: 'Launched First Product',
    description: 'We launched our first product, a mobile app for tracking expenses.',
  },
  {
    year: '2015',
    title: 'Expanded to Web Development',
    description: 'We expanded our services to include web development and started building websites for clients.',
  },
  {
    year: '2018',
    title: 'Launched E-commerce Platform',
    description: 'We launched our e-commerce platform, which allows businesses to sell their products online.',
  },
  {
    year: '2020',
    title: 'Started Learning Next.js',
    description: 'We started learning Next.js and building server-side rendered websites.',
  },
];

const Timeline = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto p-6 -z-1 w-1/2">
      <h2 className={`text-3xl font-bold mb-10 text-center text-${theme === 'dark' ? 'white' : 'black'}`}>Our Timeline</h2>
      <div className={`relative border-l border-${theme === 'dark' ? 'gray-700' : 'gray-300'}`}>
        {timelineData.map((item, idx) => (
          <div key={idx} className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 mt-1.5"></div>
            <p className={`text-sm text-${theme === 'dark' ? 'gray-400' : 'gray-700'}`}>{item.year}</p>
            <h3 className={`text-xl font-semibold text-${theme === 'dark' ? 'white' : 'black'}`}>{item.title}</h3>
            <p className={`text-gray-${theme === 'dark' ? '400' : '700'}`}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

