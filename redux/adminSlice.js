// src/redux/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to load admin info from localStorage
const loadAdminInfo = () => {
  if (typeof window !== 'undefined') {
    const savedAdmin = localStorage.getItem('masum-ecom-adminInfo');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  }
  return null; // Return null if not in the browser
};

// Function to load isLoggedIn state from localStorage
const loadIsLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  return false; // Return false if not in the browser
};

// Initial state
const initialState = {
  isLoggedIn: loadIsLoggedIn(), // Load from localStorage on initialization
  admin: loadAdminInfo(),        // Load from localStorage on initialization
};

// Create slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminInfo(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.admin = action.payload.admin;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', action.payload.isLoggedIn);
        if (action.payload.isLoggedIn) {
          localStorage.setItem('masum-ecom-adminInfo', JSON.stringify(action.payload.admin));
        } else {
          localStorage.removeItem('masum-ecom-adminInfo');
        }
      }
    },
    clearAdminInfo(state) {
      state.isLoggedIn = false;
      state.admin = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('masum-ecom-adminInfo'); // Clear admin info from localStorage
        localStorage.setItem('isLoggedIn', 'false'); // Clear isLoggedIn from localStorage
      }
    },
  },
});

// Export actions and reducer
export const { setAdminInfo, clearAdminInfo } = adminSlice.actions;
export default adminSlice.reducer;
