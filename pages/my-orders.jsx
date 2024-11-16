import { logout } from '@/redux/authSlice';
import { apiRequest } from '@/utils/api';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const MyOrders = () => {
  const { guestUUID } = useSelector((state) => state?.guestUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // State to manage collapsible details

  const loadMyOrders = async () => {
    try {
      const resp = await apiRequest(`/orders/guest-orders/${guestUUID}`, 'GET');
      console.log('my orders', resp);
      setOrders(resp); // Assuming `resp` contains the array of orders
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMyOrders();
  }, []);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the index
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-l">
      <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order, index) => (
          <div key={order._id} className="border p-4 rounded-lg shadow-md bg-gray-50">
            <h4 className="font-bold text-lg">Order ID: {order._id}</h4>
            <p className="text-gray-700">Date: {new Date(order.placedAt).toLocaleDateString()}</p>
            <p className="text-gray-700">Total Amount: TK {order.totalAmount}</p>
            <p className="text-gray-700">Status: {order.orderStatus}</p>
            <p className="text-gray-700">Payment Method: {order.paymentMethod == 'cod' && "Cash On Delivery"}</p>

            {/* Collapsible section for products */}
            <div className="mt-2">
              <h5 className="font-semibold cursor-pointer" onClick={() => toggleDetails(index)}>
                Products {openIndex === index ? '▲' : '▼'}
              </h5>
              {openIndex === index && (
                <ul className="list-disc list-inside mt-2">
                  {order.products.map((item) => (
                    <li key={item._id}>
                      <strong>{item?.product?.name ? item?.product?.name : ''}</strong> (Qty:     
                      
                       {item.quantity}) - TK {item.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
