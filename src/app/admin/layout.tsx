import Navbar from '@/layout/admin/Navbar'
import Sidebar from '@/layout/admin/Sidebar'
import React from 'react'

const AdminLayout = () => {
  return (
    <>
    <div className='w-full'>
        <Navbar/>
        <Sidebar/>
        

    </div>

    </>
  )
}

export default AdminLayout