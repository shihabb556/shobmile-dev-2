// src/pages/admin/index.js
import DashboardLayout from '@/components/admin_comps/DashboardLayout';
import React from 'react';


const AdminIndexPage = () => {
  return (
    <DashboardLayout>
      <div className='pt-[5em] px-4'>
          <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
          <p>Manage your products and orders here.</p>
      </div>
    
    </DashboardLayout>
  );
};

export default AdminIndexPage;
