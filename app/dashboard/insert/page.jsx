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

          <div className="p-4 rounded-md shadow-md mt-5">
            <h1 className="text-2xl font-semibold">Insert</h1>
            <form className="mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4" onSubmit={handlesubmit}>
              <div className="flex flex-col gap-2">
                <label className="block">Product Name:</label>
                <input type="text" name="proname" className="border rounded-md p-2 w-full" value={inputs.proname} onChange={(e) => setInputs({ ...inputs, proname: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Product Brand:</label>
                <input type="text" name="probrand" className="border rounded-md p-2 w-full" value={inputs.probrand} onChange={(e) => setInputs({ ...inputs, probrand: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Product Price:</label>
                <input type="number" name="proprice" className="border rounded-md p-2 w-full" value={inputs.proprice} onChange={(e) => setInputs({ ...inputs, proprice: Number(e.target.value) })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Product Category:</label>
                <select name="procat" className="border rounded-md p-2 w-full" value={inputs.procat} onChange={(e) => setInputs({ ...inputs, procat: e.target.value })} >
                  <option value="">---select----</option>
                  {categorydata.map((item, index) => (
                    <option key={index} value={item.category}>{item.category}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Product Description:</label>
                <textarea name="prodesc" className="border rounded-md p-2 w-full" rows="3" value={inputs.prodesc} onChange={(e) => setInputs({ ...inputs, prodesc: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block">Product Image:</label>
                <input type="file" name="proimg" className="border rounded-md p-2 w-full" onChange={handleFileChange} />
              </div>
              <button className="font-bold py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-900">
                Submit
              </button>
            </form>
          </div>
      
  )
}

export default page

