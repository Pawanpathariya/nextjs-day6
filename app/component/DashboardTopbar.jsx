"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun } from 'react-feather'
import { useTheme } from 'next-themes';
const DashboardTopbar = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const loadData = async () => {
    if (!session) {
      router.push("/");
    }
  };

  useEffect(() => {
    loadData();
  }, [session, router]);

  return (
    <div className={`bg-${theme == 'dark' ? 'gray-800' : 'white'} p-4 flex justify-between fixed w-full`}>
      <h1 className={`text-${theme == 'dark' ? 'white' : 'black'} text-2xl font-semibold ml-10`}>Dashboard</h1>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`bg-${theme === 'dark' ? 'gray-700' : 'gray-300'} px-4 py-2 rounded`}>
        {theme === 'dark' ? <Moon size={20} color="white" /> : <Sun size={20} color="black" />}
      </button>
      <div className={`flex items-center gap-5 text-${theme === 'dark' ? 'amber-50' : 'black'}`}>
        <p className={`text-${theme === 'dark' ? 'white' : 'black'}`}>Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()} className='bg-red-600 text-white px-4 py-2 rounded'>Sign Out</button>
      </div>
    </div>
  );
}

export default DashboardTopbar;

