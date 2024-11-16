import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const getInitialUserInfo = () => {
  if (typeof window !== 'undefined') {
    // We're in the browser, so we can access localStorage
    const userInfo = localStorage.getItem('masum-ecom-guestUserInfo');
    return userInfo
      ? JSON.parse(userInfo)
      : {
          name: '',
          phone: '',
          address:''
        };
  }

  // Return default value for server-side rendering
  return {
    name: '',
    phone: '',
     address:''
    // Default guest user info can go here
  };
};

const getInitialUUID = () => {
  if (typeof window !== 'undefined') {
    // We're on the client, so we can access localStorage
    return localStorage.getItem('masum-ecom-guestUUID') || '';
  }
  // Return a default value for SSR
  return '';
};


// Initial state
const initialState = {
  guestUUID: getInitialUUID(),
  userInfo: getInitialUserInfo(),
};

// Guest user slice
const guestUserSlice = createSlice({
  name: 'guestUser',
  initialState,
  reducers: {
    setGuestUUID: (state) => {
      // Generate and set UUID if not already set
      if (!state.guestUUID) {
        state.guestUUID = uuidv4();
        localStorage.setItem('masum-ecom-guestUUID', state.guestUUID); // Store in localStorage
      }
    },
    
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload }; // Update user info
      localStorage.setItem('masum-ecom-guestUserInfo', JSON.stringify(state.userInfo)); // Save to localStorage
    },

    clearUserInfo: (state) => {
      state.userInfo = initialState.userInfo; // Reset user info to initial state
      localStorage.removeItem('masum-ecom-guestUserInfo'); // Remove from localStorage
    },
  },
});

// Export actions
export const { setGuestUUID, setUserInfo, clearUserInfo } = guestUserSlice.actions;

// Export the reducer to be used in the store
export default guestUserSlice.reducer;
