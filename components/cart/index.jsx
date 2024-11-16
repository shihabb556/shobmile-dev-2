import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem'; // Path to your CartItem component
import { useRouter } from 'next/router'; // If you're using Next.js
import Link from 'next/link';
import { ShoppingBasket } from 'lucide-react';
import { closeCart, toggleCart } from '@/redux/cartSlice';
import { toast } from 'sonner';


const Cart = () => {
  const { cartItems, totalQuantity, totalPrice,isCartOpen} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleProceedToOrder = () => {
   
      router.push('/cart-page'); 

      dispatch(toggleCart(false));
  
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1800] ">
      <div className="fixed inset-0 bg-black opacity-50" onClick={()=> dispatch(closeCart())}></div>
      <div className="z-[1900] fixed right-0 min-h-screen bg-gray-100 w-[60vw] md:w-[50vw] lg:w-[40vw] p-4 shadow-lg overflow-y-auto  max-h-[90vh] ">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Busket</h2>
        {cartItems.length > 0 ? (
          <>
            <div className='relative'>
                {cartItems.map((item) => <CartItem key={item._id} item={item} />)}
            </div>
            <div className="mt-4 p-4 bg-gray-200 text-gray-700 rounded-lg">
              <p className="font-semibold ">Total Items: <span className="text-lg text-blue-600 ">{totalQuantity}</span></p>
              <p className="font-semibold">Total Price: <span className="text-lg text-blue-600 ">TK {totalPrice}</span></p>
            </div>
            <button 
              onClick={handleProceedToOrder}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 sticky bottom-1 "
            >
              Proceed to Order
            </button> 
          </>
        ) : (
         <div className='flex flex-col gap-5'>
           <div className="text-gray-600">Your busket is empty</div>
           <Link onClick={()=>dispatch(closeCart())} href="/" className='flex  gap-2 justify-center items-center text-center mt-10 bg-blue-500 p-2 rounded'>
              Shop Now
             <ShoppingBasket/>
           </Link>
         </div> 
        )}
      </div>
    </div>
  );
};

export default Cart;
