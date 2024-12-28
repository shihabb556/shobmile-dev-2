import React, { useState } from 'react';

const OrderList = ({ orders, handleUpdateStatus, handleDeleteOrder }) => {
  const [expandedOrders, setExpandedOrders] = useState({});

  // Toggle the collapse for a specific order
  const toggleCollapse = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-6 shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h2>
              <button
                onClick={() => toggleCollapse(order._id)}
                className={`text-sm font-medium px-3 py-1 rounded ${expandedOrders[order._id] ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                {expandedOrders[order._id] ? 'Collapse' : 'Expand'}
              </button>
            </div>

            <p className="mt-2 text-gray-600">Total Amount: <span className="font-semibold">TK {order.totalAmount}</span></p>
            <p className="text-gray-600">Status: <span className="font-semibold">{order.orderStatus}</span></p>

            {expandedOrders[order._id] && (
              <div className="mt-4 border-t pt-4">
                {/* Collapsible Content */}
                <div className="mb-4">
                  <h3 className="text-md font-semibold">Guest User Info:</h3>
                  <p>Name: {order.guestUserInfo?.name}</p>
                  <p>Phone: {order.guestUserInfo?.phone}</p>
                  <p>Address: {order.guestUserInfo?.address}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold">Shipping Address:</h3>
                  <p>{order.shippingAddress}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold">Products:</h3>
                  {order?.products?.map((item) => (
                    <div key={item._id} className="border p-3 rounded mb-2 bg-gray-50">
                      <p>
                        <strong>{item?.product?.name}</strong> - TK
                        {item?.product?.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Category: {item?.product?.category}</p>
                      <p>SubCategory: {item?.product?.subCategory}</p>
                   
                      <p>
                        Stock: {item?.product?.stock}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h3 className="text-md font-semibold">Payment Info:</h3>
                  <p>Method: {order.paymentMethod == 'cod' && 'Cash On Delivery'}</p>
                  <p>Status: {order.paymentStatus}</p>
                </div>

                {/* Order management buttons */}
                <div className="mt-4 flex gap-3">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    className="border p-2 rounded text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
