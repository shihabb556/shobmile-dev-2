import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/utils/api';
import DashboardLayout from '@/components/admin_comps/DashboardLayout';
import OrderList from '@/components/admin_comps/OrderList';
import { useSelector } from 'react-redux';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const { admin } = useSelector((state) => state?.admin || {});
  const token = admin?.token;

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiRequest('/orders', 'GET', null, token);
        setOrders(response);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, [token]);

  // Handle updating the order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const updatedOrder = await apiRequest(`/orders/${orderId}/change-status`, 'PUT', { orderStatus: newStatus }, token);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, orderStatus: newStatus } : order))
      );
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  // Handle deleting an order
  const handleDeleteOrder = async (orderId) => {
    try {
      await apiRequest(`/orders/${orderId}`, 'DELETE', null, token);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };

  return (
    <DashboardLayout>
      <div className='pt-[5em] px-5'>
        <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
        <OrderList
          orders={orders}
          handleUpdateStatus={handleUpdateStatus}
          handleDeleteOrder={handleDeleteOrder}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminOrdersPage;
