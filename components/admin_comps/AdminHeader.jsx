// src/components/AdminHeader.js
import React from 'react';
import Link from 'next/link';

const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4 py-5 w-full fixed top-0 z-[2000]">
      <nav className='max-w-7xl mx-auto flex justify-between items-center text-sm md:text-xl'>
        <div>
          <Link href="/admin/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/admin/orders" className="mr-4">Orders</Link>
          <Link href="/admin/products">Products</Link>
        </div>

        <div>
          <Link className='bg-blue-600 p-2 rounded-[4px]' href="/admin/add-product">Add New Product</Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
