import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { ShoppingBasket } from 'lucide-react';
import dynamic from 'next/dynamic';
import { setUserInfo } from '@/redux/guestUserSlice';
import { toast } from 'sonner';
import { apiRequest } from '@/utils/api';
import { clearCart } from '@/redux/cartSlice';
import { useRouter } from 'next/router';


const CartItem = dynamic(() => import('../components/cart/CartItem'), { ssr: false });


const CartPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  // Ensure the component has mounted before rendering
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Access cart items, totalQuantity, totalPrice from Redux store
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  
  // Access guestUUID and userInfo from Redux store
  const { guestUUID, userInfo } = useSelector((state) => state.guestUser);

  const dispatch = useDispatch();

  const [note, setNote] = useState('');

  // Disable the order button if required fields are empty
  const isDisabled = cartItems.length === 0 || userInfo.name === '' || userInfo.address === '' || userInfo.phone === '';

  const handleOrder = async () => {

    const products = cartItems.map(item => ({
      product: item._id,         // Product ID
      // name: item.name,       // Product name
      price: item.price,     // Product price
      quantity: item.quantity // Quantity from the cart
    }));
    console.log('prod',products);

    const orderDetails = {
      guestUUID,
      guestUserInfo:userInfo,
      shippingAddress: userInfo.address,
      note,
      products,
      totalQuantity,
      totalPrice,
    };


    try {

      let resp = await apiRequest(`/orders`,'POST',orderDetails);
      console.log(resp)
      toast('Order placed successfully!');
      dispatch(clearCart());
      router.push('/my-orders')
      
    } catch (error) {
      console.log(error)
    }


 
  };

  const handleUserInfoChange = (key, value) => {
    dispatch(setUserInfo({ [key]: value })); // Update userInfo in Redux store
  };

  if (!hasMounted) {
    // Avoid rendering content until the client has mounted
    return null;
  }

  return (
    <div className="container mx-auto p-6 pb-[5em] max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="bg-gray-100 p-6">
        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-semibold">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={userInfo.name}
            onChange={(e) => handleUserInfoChange('name', e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <label htmlFor="phone" className="text-lg font-semibold">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="01770******"
            value={userInfo.phone}
            onChange={(e) => handleUserInfoChange('phone', e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
        </div>

        {/* Shipping Address Section */}
        <div className="mb-4">
          <label htmlFor="shippingAddress" className="text-lg font-semibold">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            placeholder="Provide your address here"
            value={userInfo.address}
            onChange={(e) => handleUserInfoChange('address', e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
        </div>

        {/* Add Note Section */}
        <div className="mb-4">
          <label htmlFor="note" className="text-lg font-semibold">Note (Optional)</label>
          <textarea
            value={note}
            id="note"
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add any additional notes..."
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="mb-4 mt-10">
        <h3 className="text-lg font-semibold">Your Cart Items</h3>
        {cartItems.length > 0 ? (
          <div>
            <div className="overflow-y-auto max-h-[50vh] p-5 bg-gray-100">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-200 text-gray-700 rounded-lg">
              <div className="font-semibold">
                Total Items: <span className="text-lg text-blue-600">{totalQuantity}</span>
              </div>
              <div className="font-semibold">
                Subtotal: <span className="text-lg text-blue-600">TK {totalPrice}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 text-gray-100">
            <div className="text-gray-600">Your basket is empty</div>
            <Link href="/" className="flex gap-2 justify-center items-center text-center mt-10 bg-blue-500 p-2 rounded">
              Shop Now
              <ShoppingBasket />
            </Link>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          onClick={handleOrder}
          className={`text-4xl mt-4 py-2 px-6 rounded-[14px] ${
            isDisabled ? 'bg-blue-400 text-white cursor-not-allowed hover:bg-blue-400' : 'bg-blue-500 text-white hover:bg-blue-700'
          }`}
          disabled={isDisabled}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
