'use client'
import React from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'

const page = () => {
  const [category,setcategory]= useState('');
  const [categorydata,setcategorydata]= useState([]);
  const [sno,setsno]=useState(1);

  useEffect(()=>{
    loadcategory();
  },[])

  const loadcategory=async()=>{
    let api='/api/product/category';
    const response=await axios.get(api);
    console.log(response.data)
    setcategorydata(response.data.data);
  }
  
  const handlesubmit= async(e)=>{
      e.preventDefault()
    let api='/api/product/category';  
    const response=await axios.post(api,{category});
   alert(response.data);
   setcategory('');
   setsno(sno+1);
  }


  return (
    <> 
      <DashboardTopbar />
      <div className='flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 lg:gap-y-0'>
        <div className='w-full lg:w-1/3 lg:max-w-[300px]'>
          <Sidebar />
        </div>
        <div className='w-full lg:w-2/3 lg:max-w-[800px] mt-2'>
          <div className="mt-15">
          <div className="bg-white p-6 rounded-md shadow-md w-full mt-20 items-center justify-center ">
            <h2 className="text-2xl font-semibold mb-4 align-center items-center justify-center">Add Category</h2>
            <form >
              <div className="mb-4">
                <label className="block mb-2" htmlFor="category">Enter Category</label>
                <input type="text" name='category' id="category" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={category} onChange={(e) => setcategory(e.target.value)} />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handlesubmit}>Add</button>
            </form>
          </div>


          <table className='w-full mt-5'>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {  
           
                categorydata.map((data2,index) => (
                  <tr key={data2._id} className="border-b border-gray-300 text-center">
                    <td>{sno+index}</td>
                    <td className="px-4 py-2">{data2.category}</td>
                  </tr>
             
                ))
              }
            </tbody>
          </table>
          
              </div>
        </div>
      </div>
    </>
  )
}

export default page

