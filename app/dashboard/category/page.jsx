'use client'
import React, { useState, useEffect } from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'
import { useTheme } from 'next-themes';

const page = () => {
  const [category, setCategory] = useState('')
  const [categoryData, setCategoryData] = useState([])
  const [sno, setSno] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = async () => {
    let api = '/api/product/category'
    const response = await axios.get(api)
    setCategoryData(response.data.data)
    setSno(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let api = '/api/product/category'
    const response = await axios.post(api, { category })
    alert(response.data.message)
    setCategory('')
    setShowModal(false)
    loadCategory()
  }

  return (
    <div className="w-full lg:w-2/3 lg:max-w-[800px] mt-2">
      <div className="mt-15">
        <div className="bg-white p-6 rounded-md shadow-md w-full mt-20 items-center justify-center" style={{ backgroundColor: theme === 'dark' ? '#1A202C' : '#fff' }}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={() => setShowModal(true)}>Add Category</button>
          {showModal && (
            <div className="fixed top-20 left-150 bg-opacity-50 flex items-center justify-center ">
              <div className="bg-white p-6 rounded-md shadow-md w-200 max-w-md z-20" style={{ backgroundColor: theme === 'dark' ? '#1A202C' : '#fff' }}>
                <h2 className="text-2xl font-semibold mb-4 text-center">Enter Category</h2>
                <form>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="category">Category Name</label>
                    <input type="text" name='category' id="category" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={category} onChange={(e) => setCategory(e.target.value)} style={{ backgroundColor: theme === 'dark' ? '#1A202C' : '#fff' }} />
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Add</button>
                </form>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <h1 className='text-2xl font-semibold text-center mb-5' style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Our Category</h1>
          <table className="table-auto w-full text-center border-collapse border border-gray-300" style={{ backgroundColor: theme === 'dark' ? '#1A202C' : '#fff' }}>
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Sno.</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((data2, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b border-gray-300">
                  <td className="px-4 py-2 border border-gray-300">{sno + index}</td>
                  <td className="px-4 py-2 border border-gray-300">{data2.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page

