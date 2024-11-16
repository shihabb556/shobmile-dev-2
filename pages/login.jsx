// src/pages/login.js
import LoginForm from '@/components/admin_comps/LoginForm';
import React, { useState } from 'react';


const LoginPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
