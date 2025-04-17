'use client'
import DashboardTopbar from '@/app/component/DashboardTopbar' 
import Sidebar from '@/app/component/Sidebar'
import axios from 'axios'
import jsPDF from 'jspdf'
import { useTheme } from 'next-themes';
const layout = ({children}) => {
      const { theme, setTheme } = useTheme();
      const toggleTheme = () => {
        if (theme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }
    
  return (
    <>
        <div className={`bg-${theme === 'dark' ? 'dark' : 'light'}-100 min-h-screen`}>
      <DashboardTopbar toggleTheme={toggleTheme} />
      <div className='flex text-black gap-5'>
        <div>
          <Sidebar />
        </div>
        <div className='text-black w-full mt-20'>

{children}
    
        </div>
    
<div/>
      </div>
</div>
    </>
  )
}

export default layout