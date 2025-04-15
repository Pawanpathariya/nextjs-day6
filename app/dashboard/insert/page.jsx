'use client'
import React from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'
import { useTheme } from 'next-themes';

const page = () => {
  const [product, setProduct] = useState({})
  const [filename, setFilename] = useState('');
  const [image, setImage] = useState(null);
  const [categorydata, setcategorydata] = useState([]);
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
    const response = await axios.post(api, { ...product, imageurl: response1.data.url });
    console.log(response.data);
    alert(response.data.message)
    setProduct({
      proname: '',
      probrand: '',
      procat: '',
      prodesc: '',
      proprice: '',
    });
  }

  useEffect(() => {
    loadcategory();
  }, [])

  const loadcategory = async () => {
    let api = '/api/product/category';
    const response = await axios.get(api);
    console.log(response.data.data)
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
              {['Product Name:', 'Product Brand:', 'Product Price:', 'Product Description:'].map((label, i) => (
                <div key={i} className='flex flex-col gap-2'>
                  <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{label}</label>
                  {label === 'Product Description:' ? (
                    <textarea name={`pro${label.split(' ')[1].toLowerCase()}`} className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} rows="3" value={product[`pro${label.split(' ')[1].toLowerCase()}`]} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} />
                  ) : (
                    <input type="text" name={`pro${label.split(' ')[1].toLowerCase()}`} className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} value={product[`pro${label.split(' ')[1].toLowerCase()}`]} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} />
                  )}
                </div>
              ))}
              <div className='flex flex-col gap-2'>
                <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Category:</label>
                <select name="procat" className={`border rounded-md p-2 w-full ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} value={product.procat} onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })} >
                  <option value="">---select----</option>
                  {categorydata.map((item, index) => (
                    <option key={index} value={item.category}>{item.category}</option>
                  ))}
                </select>
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

