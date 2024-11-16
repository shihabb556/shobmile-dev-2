import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '@/redux/cartSlice';
import { Delete } from 'lucide-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const quantity = item.quantity || 1; // Ensure quantity is at least 1
  const totalPrice = (item.price * quantity).toFixed(2); // Calculate total price based on quantity

  const handleIncrement = () => {
    dispatch(updateCartItemQuantity({ itemId: item._id, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ itemId: item._id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <div className=" flex sm:items-center justify-between p-4 border-b border-gray-300 bg-white shadow-md rounded-lg mb-5 relative flex-col sm:flex-row gap-3">
      <div className="flex flex-col">
        <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
        <p className="text-gray-600">Price: <span className="text-lg text-blue-600">TK {item.price.toFixed(2)} </span> </p>
      </div>
      <div className="flex items-center mr-10">
        <button onClick={handleDecrement} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">-</button>
        <span className="mx-2 text-center w-[2.5em] text-lg font-semibold text-gray-700">{quantity}</span>
        <button onClick={handleIncrement} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">+</button>

        {/* <div className='flex flex-col ml-4'>
         <span className="font-bold text-lg text-gray-700">${totalPrice}</span>
        </div> */}
      </div>
  
      <button onClick={handleRemove} className="text-red-500 transition duration-200 absolute top-0 right-0 px-2 rounded-full">
        <Delete/>
      </button>
    </div>
  );
};

export default CartItem;
