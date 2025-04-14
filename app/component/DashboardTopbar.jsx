"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardTopbar = () => {
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
    <div className="bg-gray-800 p-4 flex justify-between fixed w-full">
      <h1 className="text-white text-2xl font-semibold ml-10">Dashboard</h1>
      <div className="flex items-center gap-5 text-amber-50">
        <p className="text-white">Signed in as {session?.user?.email}</p>
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      </div>
    </div>
  );
}

export default DashboardTopbar;

