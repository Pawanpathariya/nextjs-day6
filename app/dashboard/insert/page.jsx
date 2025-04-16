'use client'
import React, { useState, useEffect } from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'
import { useTheme } from 'next-themes';

const page = () => {
  const [inputs, setInputs] = useState({
    proname: '',
    probrand: '',
    procat: '',
    prodesc: '',
    proprice: 0,
    proimg: '',
  })
  const [categorydata, setcategorydata] = useState([]);
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, []);

  const handleFileChange = (event) => {
    setFilename(event.target.files[0].name);
    setImage(event.target.files[0]);
  };

  const handlesubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "pawan_cloud");
    formData.append('cloud_name', 'dbwpnzi57');
    const api1 = 'https://api.cloudinary.com/v1_1/dbwpnzi57/image/upload';
    const response1 = await axios.post(api1, formData);
    const api = "/api/product";
    const response = await axios.post(api, { ...inputs, imageurl: response1.data.url });
    alert(response.data.message)
  }

  useEffect(() => {
    loadcategory();
  }, [])

  const loadcategory = async () => {
    let api = '/api/product/category';
    const response = await axios.get(api);
    setcategorydata(response.data.data);
  }

  return (
    <>
      <DashboardTopbar />
      <div className='flex flex-col lg:flex-row lg:gap-x-5 gap-y-5 lg:gap-y-0'>
        <div className='w-full lg:w-1/3 lg:max-w-[300px]'>
          <Sidebar />
        </div>
        <div className='w-full lg:w-2/3 lg:max-w-[800px] mt-2'>
          <div className={`p-4 rounded-md shadow-md mt-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Insert</h1>
            <form className={`mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4 ${theme === 'dark' ? 'text-white,bg-white' : 'text-gray-900'}`}>
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Name:</label>
                <input type="text" name="proname" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} value={inputs.proname} onChange={(e) => setInputs({ ...inputs, proname: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Brand:</label>
                <input type="text" name="probrand" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} value={inputs.probrand} onChange={(e) => setInputs({ ...inputs, probrand: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Price:</label>
                <input type="number" name="proprice" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} value={inputs.proprice} onChange={(e) => setInputs({ ...inputs, proprice: Number(e.target.value) })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Category:</label>
                <select name="procat" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} value={inputs.procat} onChange={(e) => setInputs({ ...inputs, procat: e.target.value })} >
                  <option value="">---select----</option>
                  {categorydata.map((item, index) => (
                    <option key={index} value={item.category}>{item.category}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Description:</label>
                <textarea name="prodesc" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} rows="3" value={inputs.prodesc} onChange={(e) => setInputs({ ...inputs, prodesc: e.target.value })} />
              </div>
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Image:</label>
                <input type="file" name="proimg" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} onChange={handleFileChange} />
              </div>
              <button className={`font-bold py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-900'}`} onClick={handlesubmit}>
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

