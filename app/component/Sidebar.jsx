import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 text-white bg-gray-800 p-2 rounded"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 p-4 mt-18 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          <ul className="mt-4 flex flex-col gap-10 justify-center items-center pt-10">
            <li>
              <Link href="/dashboard" className="text-white hover:underline text-3xl">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/insert" className="text-white hover:underline text-3xl">
                Insert
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

