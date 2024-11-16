import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, register } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [rememberMe, setRememberMe] = useState(false); 
  const {loading,error,token } = useSelector((state)=>state.auth);
 
 
  const dispatch = useDispatch();
  const router = useRouter();
 

 
  if(token || token != null){
    router.push('/cart-page');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (!isLogin && password !== confirmPassword) {
    
      toast.error('Passwords do not match.');
      return;
    }
  
    try {
      const fullPhoneNumber = isLogin ? phoneNumber : `+88${phoneNumber}`;
  
      if (isLogin) {
        const loginResponse = await dispatch(login({ email, password, rememberMe }));
        if (loginResponse.payload && loginResponse.payload.token) {
          toast.success('Login successful!');
          router.push('/cart-page'); // Redirect after successful login
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      } else {
        const registerResponse = await dispatch(register({ name, email, password, phone: fullPhoneNumber }));
        if (registerResponse.payload && registerResponse.payload.message === 'Registration successful') {
          toast.success('Registration successful! You can now log in.');
          setIsLogin(true); // Switch to login form after successful registration
        } else {
          toast.error('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      toast.error('Failed to authenticate. Please try again.'); // General error toast
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800 pb-10 py-[3em]">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
      
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4 flex gap-1 flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}
          <div className="mb-4 flex gap-1 flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {!isLogin && (
          <div className="mb-4 flex gap-1 flex-col">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="01XXXXXXXXX"
            pattern="^01[3-9]\d{8}$" // Updated pattern
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
          )}
          <div className="mb-4 flex gap-1 flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {!isLogin && (
            <div className="mb-4 flex gap-1 flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}
      
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
           {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <>
              <div className="flex gap-2 items-center justify-center">
                <p>Don&apos;t have an account?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-700 hover:underline"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-4">
                <a href="#" className="text-blue-700 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="mb-2">Already have an account?</p>
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-700 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
