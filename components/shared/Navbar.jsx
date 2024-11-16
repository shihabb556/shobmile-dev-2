import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { ShoppingCart } from 'lucide-react';
import Cart from '../cart';
import { useSelector,useDispatch } from 'react-redux';
import { toggleCart } from '@/redux/cartSlice'; 

const Navbar = () => {
 
  const dispatch = useDispatch();
  const router = useRouter();
  const {  totalQuantity, isCartOpen} = useSelector((state)=> state.cart);  
  const {  token } = useSelector((state)=> state.auth); 


   useEffect(() => {
    // Disable scrolling on the body when the cart is open
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup: revert scrolling behavior on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  const isAdminRoute = /^\/admin/.test(router.pathname);
  console.log(token)

  return (
    <nav className={` md:sticky md:bg-gray-800 text-white shadow-lg fixed top-[-4em] md:top-0 w-full z-[1000] ${ isAdminRoute ? 'hidden' : 'block'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center hidden md:block">
            <Link href="/" className="text-2xl font-bold transition duration-300 ">
              <span className='text-blue-400'>Shob</span>
              <span>Mile</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
     
            <Link href="/"  className={`hover:text-blue-300 px-3 py-2 rounded-md transition duration-300 ${router.pathname === '/' ? 'text-blue-400' : ''}`}>
             Shop
            </Link>
            <Link href="/my-orders"  className={`hover:text-blue-300 px-3 py-2 rounded-md transition duration-300 ${router.pathname === '/my-orders' ? 'text-blue-400' : ''}`}>
              My Orders
            </Link>
       
            {/* {
             !token && token == null && (
               <Link href="/auth/login" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300 transition duration-300 ${router.pathname === '/auth/login' ? 'text-blue-400' : ''}`}>
                  Login
               </Link>
             )
            } */}

            <button className='relative'  
              onClick={() => dispatch(toggleCart())}
              >
                <span className='absolute top-[-8px] bg-red-500 rounded-full w-5 h-5 text-sm'> {  totalQuantity} </span>
                <ShoppingCart /> 
            </button>
          </div>

         
          
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={` md:hidden fixed bottom-0 bg-gray-800 w-full`}>
        <div className="px-2 pt-2 pb-1 space-y-1 sm:px-3 flex items-center justify-around">
          {/* <Link href="/home"  className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300 transition duration-300 ${router.pathname === '/' ? 'text-blue-400' : ''}`}>
            Home
          </Link> */}
          <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300 transition duration-300 ${router.pathname === '/' ? 'text-blue-400' : ''}`}>
           Shop
          </Link>
          <Link href="/my-orders" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300 transition duration-300 ${router.pathname === '/my-orders' ? 'text-blue-400' : ''}`}>
           My Orders
          </Link>
         
         {/* {
           !token && token == null && (
             <Link href="/auth/login" className={`block px-3 py-2 rounded-md text-base font-medium hover:text-blue-300 transition duration-300 ${router.pathname === '/auth/login' ? 'text-blue-400' : ''}`}>
                Login
            </Link>
          )
         } */}

          <button className='relative '  
            onClick={() => dispatch(toggleCart())}
           >
              <span className='absolute top-[-8px] bg-red-500 rounded-full w-5 h-5 text-sm'> {  totalQuantity} </span>
              <ShoppingCart /> 
          </button>
        </div>
      </div>

      {/* Cart components  */}
      <Cart toggleCart={toggleCart} isCartOpen={isCartOpen}/>
    </nav>
  );
};

export default Navbar;
