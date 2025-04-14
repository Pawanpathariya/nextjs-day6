'use client'
import React from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'

const page = () => {
  const [product, setProduct] = useState({})
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setFilename(event.target.files[0].name);
    setImage(event.target.files[0]);
  };

  const handlesubmit= async(e)=>{
      e.preventDefault()
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset","pawan_cloud");
      formData.append('cloud_name','dbwpnzi57');
      const api1='https://api.cloudinary.com/v1_1/dbwpnzi57/image/upload';
      const response1 = await axios.post(api1, formData);
      const api="/api/product";
      const response=await axios.post(api,{...product,imageurl:response1.data.url});
console.log(response.data);
      alert(response.data.message)
  }


  return (
    <> 
      <DashboardTopbar />
      <div className='flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 lg:gap-y-0'>
        <div className='w-full lg:w-1/3 lg:max-w-[300px]'>
          <Sidebar />
        </div>
        <div className='w-full lg:w-2/3 lg:max-w-[800px] mt-2'>
          <div className='bg-white p-4 rounded-md shadow-md mt-5'>
            <h1 className='text-2xl font-semibold'>Insert</h1>
            <form className='mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='block'>Product Name:</label>
                <input type="text" name="proname" className='border border-gray-300 rounded-md p-2 w-full' onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}  />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='block'>Product Brand:</label>
                <input type="text" name="probrand" className='border border-gray-300 rounded-md p-2 w-full' onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='block'>Product Category:</label>
                <select name="procat" className='border border-gray-300 rounded-md p-2 w-full' onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} >
                  <option value="">---select----</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='block'>Product Price:</label>
                <input type="text" name="proprice" className='border border-gray-300 rounded-md p-2 w-full' onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='block'>Product Description:</label>
                <textarea name="prodesc" className='border border-gray-300 rounded-md p-2 w-full' rows="3" onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='block'>Product Image:</label>
                <input type="file" name="proimg" className='border border-gray-300 rounded-md p-2 w-full' onChange={handleFileChange} />
              </div>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={handlesubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default page

