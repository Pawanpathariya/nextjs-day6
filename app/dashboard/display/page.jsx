'use client'
import React, { useState, useEffect } from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'
import jsPDF from 'jspdf'
import { useTheme } from 'next-themes';

const page = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('')
  const [categorydata,setcategorydata]= useState([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const api = "/api/product";
      const response = await axios.get(api);
      const data = response?.data?.data;
      setProduct(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  }

  const handlePagination = (event) => {
    setCurrentPage(parseInt(event.target.value));
  }

  const nextPage = () => {
    if(currentPage === totalPages) return
    setCurrentPage((prevPage) => prevPage + 1);
  }

  const prevPage = () => {
    if(currentPage === 1) return
    setCurrentPage((prevPage) => prevPage - 1);
  }

  const searchpro = async (e) => {
    let proname = e.target.value;
    let api = '/api/product/search';
    try {
      let response = await axios.post(api, { proname });
      setProduct(response.data.prod);
      setTotalPages(Math.ceil(response.data.prod.length / itemsPerPage));
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const searchcategory = async (e) => {
    const cat = e.target.value;
    let api = '/api/product/searchbycategory';
    try {
      let response = await axios.post(api, { cat });
      setProduct(response.data.prod);
      setTotalPages(Math.ceil(response.data.prod.length / itemsPerPage));
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.text('Product List', 10, y);
    y += 10;
    product.forEach((data2, index) => {
      doc.text(`Product ${index + 1}:`, 10, y);
      y += 10;
      doc.text(`Name: ${data2.proname}`, 10, y);
      y += 10;
      doc.text(`Brand: ${data2.probrand}`, 10, y);
      y += 10;
      doc.text(`Category: ${data2.procategory}`, 10, y);
      y += 10;
      doc.text(`Description: ${data2.prodesc}`, 10, y);
      y += 10;
      doc.text(`Price: ${data2.proprice}`, 10, y);
      y += 10;
      y += 10;
    });
    doc.save('products.pdf');
  }

  const handleSort = (e) => {
    setSort(e.target.value);
    let sortedProduct = [...product];
    if (e.target.value === 'low') {
      sortedProduct.sort((a, b) => a.proprice - b.proprice);
    } else if (e.target.value === 'high') {
      sortedProduct.sort((a, b) => b.proprice - a.proprice);
    }
    setProduct(sortedProduct);
  }

  useEffect(()=>{
    loadcategory();
  },[])

  const loadcategory=async()=>{
    let api='/api/product/category';
    const response=await axios.get(api);
    setcategorydata(response.data.data);
  }

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <div className={`bg-${theme === 'dark' ? 'dark' : 'light'}-100 min-h-screen`}>
      <DashboardTopbar toggleTheme={toggleTheme} />
      <div className='flex text-black gap-5'>
        <div>
          <Sidebar />
        </div>
        <div className='text-black ml-60 w-full mt-20'>
          <div className='flex flex-wrap gap-5 items-center bg-gray-100 p-4 rounded-lg shadow-md'>
            <input 
              type="text" 
              name="proname" 
              onChange={searchpro} 
              className="w-full sm:w-48 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" 
              placeholder='Search by product name' 
            />
            <select 
              name="procat" 
              className='w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600' 
              onChange={searchcategory}
            >
              <option value="" className='italic text-gray-400'>Select Category</option>
              {categorydata.map((item, index) => (
                <option key={index} value={item.category} className='text-gray-700'>
                  {item.category}
                </option>
              ))}
            </select>
            <button 
              onClick={downloadPDF} 
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300"
            >
              Download PDF
            </button>
            <label className='mr-2 text-sm font-semibold'>Sort by Price:</label>
            <select 
              value={sort} 
              onChange={handleSort} 
              className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="" className='italic text-gray-400'>Select</option>
              <option value="low" className='text-gray-700'>Low to High</option>
              <option value="high" className='text-gray-700'>High to Low</option>
            </select>
          </div>
          <table className='w-full border-collapse border border-gray-400'>
            <thead className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
              <tr>
                <th className='border border-gray-400 px-4 py-2'>Product Name</th>
                <th className='border border-gray-400 px-4 py-2'>Product Brand</th>
                <th className='border border-gray-400 px-4 py-2'>Product Category</th>
                <th className='border border-gray-400 px-4 py-2'>Product Description</th>
                <th className='border border-gray-400 px-4 py-2'>Product Price</th>
                <th className='border border-gray-400 px-4 py-2'>Product Image</th>
              </tr>
            </thead>
            <tbody className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
              {
                product.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data2) => (
                  <tr key={data2.proname} className="border-b border-gray-300 text-center">
                    <td className="border border-gray-400 px-4 py-2">{data2.proname}</td>
                    <td className="border border-gray-400 px-4 py-2">{data2.probrand}</td>
                    <td className="border border-gray-400 px-4 py-2">{data2.procategory}</td>
                    <td className="border border-gray-400 px-4 py-2">{data2.prodesc}</td>
                    <td className="border border-gray-400 px-4 py-2">{data2.proprice}</td>
                    <td className="border border-gray-400 px-4 py-2"><img src={data2.imageUrl} alt={data2.proname} width={100} height={100} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button onClick={prevPage} className="px-4 py-2 mr-2 bg-gray-300 rounded-md">Prev</button>
            {
              Array(totalPages).fill(0).map((_, i) => (
                <button key={i + 1} className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'} rounded-md`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              ))
            }
            <button onClick={nextPage} className="px-4 py-2 ml-2 bg-gray-300 rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

