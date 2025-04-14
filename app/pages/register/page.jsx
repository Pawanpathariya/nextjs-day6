'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import schema from '@/app/middleware/zodschema'
const page = () => {
    const [data, setData] = useState({});

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = schema.safeParse(data);
            if (!result.success) {
                const errors = result.error.errors;
                const messages = errors.map(error => error.message);
                alert(messages.join(', '));
                return;
            }
            let api='/api/user';
            try {
             let response= await axios.post(api,data);
            alert(response.data.message)   
            } catch (error) {
               console.log(error) 
            }
        } catch (error) {
            alert(error.message);
        }
    }

  return (
  <>
  
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/2 lg:w-1/3 sm:w-1/2">
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 className="text-3xl font-bold text-center">Register</h3>
      <form>
        <div className="mt-4">
          <div>
            <label className="block" htmlFor="name">Name</label>
            <input type="text" id="name" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name='name' onChange={handleInput} />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name='email' onChange={handleInput} />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="email">Phone</label>
            <input type="text" id="phone" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name='phone' onChange={handleInput} />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">Password</label>
            <input type="password" id="password" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name='password'onChange={handleInput}  />
          </div>
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={handleSubmit}>Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </>
  )
}

export default page
