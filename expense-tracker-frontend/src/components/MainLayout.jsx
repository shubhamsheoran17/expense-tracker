import React from 'react'
import Sidebar from './Sidebar'

const MainLayout = ({children}) => {
  return (
    <>
        <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <div className='w-full p-6 mt-[300px] sm:mt-0 sm:ml-64 md:ml-68 lg:ml-[275px]'>
                {children}
            </div>
        </div>
    </>
  )
}

export default MainLayout
