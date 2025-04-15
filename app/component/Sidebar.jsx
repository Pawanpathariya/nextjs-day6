import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-20 text-${theme === 'dark' ? 'white' : 'black'} bg-${theme === 'dark' ? 'gray-800' : 'gray-300'} p-2 rounded`}
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-${theme === 'dark' ? 'gray-800' : 'white'} p-4 mt-18 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ marginRight: isOpen ? 0 : '64px' }}
      >
        <div className="flex flex-col">
          <ul className="mt-4 flex flex-col gap-5 justify-center items-center pt-10">
            <li>
              <Link href="/dashboard" className={`text-${theme === 'dark' ? 'white' : 'black'} hover:underline text-2xl`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/display" className={`text-${theme === 'dark' ? 'white' : 'black'} hover:underline text-2xl`}>
                Display
              </Link>
            </li>
            <li>
              <Link href="/dashboard/insert" className={`text-${theme === 'dark' ? 'white' : 'black'} hover:underline text-2xl`}>
                Insert
              </Link>
            </li>
            <li>
              <Link href="/dashboard/category" className={`text-${theme === 'dark' ? 'white' : 'black'} hover:underline text-2xl`}>
                Category
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

