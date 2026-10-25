import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import { Outlet, useLocation } from 'react-router-dom'


const routeTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/customers': 'Clients',
  '/admin/projects': 'Projects',
  '/admin/tasks': 'Tasks',
  '/admin/analytics': 'Reports',
  '/admin/chat': 'Messages',
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const location = useLocation();
  const title = routeTitles[location.pathname] || 'Dashboard';
  return (
    <div className='flex'>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div className='flex-1'>
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} title={title}/>
        <main className='p-6'>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
