'use client'
import React from 'react'
import DashboardTopbar from '@/app/component/DashboardTopbar'
import Sidebar from '@/app/component/Sidebar'
import LineChart from '../component/chart'
import BarChart from '../component/barchart'
import Kpi from '../component/kpi'
import Timelines from '../component/timelines'
import Paichart from '../component/paichart'

const page = () => {
  return (
    <>

          <div>
            <Kpi />
          </div>
          <div className="flex flex-wrap">
            <LineChart />
            <BarChart />
          </div>
          <div style={{ marginTop: '-382px' }} className="flex flex-wrap">
            <Timelines />
            <Paichart />
          </div>
  
    </>
  )
}

export default page

