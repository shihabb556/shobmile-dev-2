import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminInfo } from '@/redux/adminSlice';
import { apiRequest } from '@/utils/api';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  // Get admin info from Redux store
  const { admin } = useSelector((state) => state?.admin || {});
  const token = admin?.token;
  const role = admin?.user?.role;

  // Check if user is already logged in as admin
  useEffect(() => {
    if (token && role === 'admin') {
      // Redirect to admin dashboard if already logged in
      router.push('/admin/dashboard');
    }
  }, [token, role, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest('/user/login', 'POST', { email, password });
      console.log(response);
      dispatch(setAdminInfo({ isLoggedIn: true, admin: response }));
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-lg">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
    </form>
  );
};

export default LoginForm;
