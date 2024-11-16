import { useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import '../lib/fontAwesome';
import { Toaster } from 'sonner';
import { initializeCart } from '@/redux/cartSlice';
import { setGuestUUID } from '@/redux/guestUserSlice';
import { setAdminInfo } from '@/redux/adminSlice';
import AdminHeader from '@/components/admin_comps/AdminHeader';

// Move dispatch logic to a custom component that will be wrapped by the Provider
function InitApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());
    dispatch(setGuestUUID());
  }, [dispatch]);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminInfo');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn && savedAdmin) {
      dispatch(setAdminInfo({
        isLoggedIn,
        admin: JSON.parse(savedAdmin),
      }));
    }
  }, [dispatch]);

  return null; // This component is just for side effects, so it doesn't render anything
}

function MyApp({ Component, pageProps }) {
  const { admin } = useSelector((state) => state?.admin || {});
  
  // State to track if app is mounted (client-side rendering)
  const [isMounted, setIsMounted] = useState(false);

  // Destructure token and user from admin
  const token = admin?.token || null;
  const user = admin?.user || {};

  useEffect(() => {
    // This will only run on the client side
    setIsMounted(true);
  }, []);

  // Prevent rendering on the server (initial hydration)
  if (!isMounted) {
    return null; // Or a loader if needed
  }

  return (
    <>
      <Head>
        <title>ShobMile | An All in one Store Where you can fill your desired needs</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </Head>
      {/* Conditionally render header based on role after client-side is ready */}
      {token && user?.role === 'admin' ? <AdminHeader /> : <Navbar />}
      
      <Toaster 
        position="bottom-right"
        duration={3000} 
      />
      <div className="max-w-7xl mx-auto min-h-screen text-gray-800">
        <Component {...pageProps} />
      </div>
    </>
  );
}

function WrappedApp(props) {
  return (
    <Provider store={store}>
      <InitApp /> {/* Dispatch logic is handled here */}
      <MyApp {...props} />
    </Provider>
  );
}

export default WrappedApp;
