'use client'
import React, { useState, useEffect } from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'
import jsPDF from 'jspdf'

const page = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [sort, setSort] = useState('')

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const api = "/api/product";
      const response = await axios.get(api);
      const data = response?.data?.data;
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePagination = (event) => {
    setCurrentPage(parseInt(event.target.value));
  }

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(product.length / itemsPerPage)));
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  const searchpro = async (e) => {
    let proname = e.target.value;
    let api = 'api/product/search';
    try {
      let response = await axios.post(api, { proname });
      setProduct(response.data.prod);
      console.log(response.data.prod);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const searchcategory = async (e) => {
    const cat = e.target.value;
    let api = 'api/product/searchbycategory';
    try {
      let response = await axios.post(api, { cat });
      setProduct(response.data.prod);
      console.log(response.data.prod);
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

  return (
    <>
      <DashboardTopbar />
      <div className='flex text-black gap-5'>
        <div>
          <Sidebar />
        </div>
        <div className='text-black ml-60 w-full mt-20'>
          <div className='flex gap-5'>
            <div className="flex items-center justify-center mb-4">
              <input type="text" name="proname" onChange={searchpro} className="w-48 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder='search'/>
            </div>
            <div className='flex flex-col gap-4'>
              <select name="procat" className='border border-gray-400 rounded-lg p-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600' onChange={searchcategory}>
                <option value="" className='italic text-gray-500'>---select----</option>
                <option value="Mobile" className='text-gray-800'>Mobile</option>
                <option value="Laptop" className='text-gray-800'>Laptop</option>
                <option value="Tablet" className='text-gray-800'>Tablet</option>
              </select>
            </div>
            <div className="flex justify-center mt-4">
            <button onClick={downloadPDF} className="px-4 py-2 bg-blue-500 text-white rounded-md ">Download PDF</button>
          </div>
          </div>
          <div className='flex items-center justify-center'>
            <label className='mr-2'>Sort by Price:</label>
            <select value={sort} onChange={handleSort} className="border border-gray-400 rounded-lg p-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="" className='italic text-gray-500'>---select----</option>
              <option value="low" className='text-gray-800'>Low to High</option>
              <option value="high" className='text-gray-800'>High to Low</option>
            </select>
          </div>
          <table className='w-full'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th>Product Category</th>
                <th>Product Description</th>
                <th>Product Price</th>
                <th>Product Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                product.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data2) => (
                  <tr key={data2._id} className="border-b border-gray-300 text-center">
                    <td className="px-4 py-2">{data2.proname}</td>
                    <td className="px-4 py-2">{data2.probrand}</td>
                    <td className="px-4 py-2">{data2.procategory}</td>
                    <td className="px-4 py-2">{data2.prodesc}</td>
                    <td className="px-4 py-2">{data2.proprice}</td>
                    <td className="px-4 py-2"><img src={data2.imageUrl} width={100} height={100} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button onClick={prevPage} className="px-4 py-2 mr-2 bg-gray-300 rounded-md">Prev</button>
            <select value={currentPage} onChange={handlePagination} className="px-4 py-2 border rounded-md">
              {Array(Math.ceil(product.length / itemsPerPage)).fill(0).map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button onClick={nextPage} className="px-4 py-2 ml-2 bg-gray-300 rounded-md">Next</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default page


