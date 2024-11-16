import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Get admin info from Redux store
  const { admin } = useSelector((state) => state?.admin || {});
  const token = admin?.token;
  const role = admin?.user?.role;

  // Only render on the client
  useEffect(() => {
    setIsClient(true);
    if (!token || role !== 'admin') {
      router.push('/login'); // Redirect to login if not authenticated or not an admin
    }
  }, [token, role, router]);

  // Prevent rendering on the server to avoid hydration issues
  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div>
      <div className=" mx-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
