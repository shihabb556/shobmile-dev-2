import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../utils/api'; // Adjust path if needed

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    console.log('from auth: ',email,password);
    
    if (!email || !password) {
      console.error("Email and password are required.");
      return;
    }

    try {
      const res = await apiRequest('/user/login', 'POST', { email, password });
      if (res.success) {
        // Save user and token to localStorage
        localStorage.setItem('masum_ecom_user', JSON.stringify(res.user));
        localStorage.setItem('masum_ecom_token', res.token);
        return { user: res.user, token: res.token };
      } else {
        return rejectWithValue(res.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, phone,password }, { rejectWithValue }) => {
    console.log( name, email, phone,password)
    try {
      const res = await apiRequest('/user/register', 'POST', { fullname:name, email,phone, password });
      console.log(res)
      if (res.success) {
        // If the server returns success, simply return a message
        return { message: 'Registration successful' };
      } else {
        return rejectWithValue(res.message);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('masum_ecom_user');
      localStorage.removeItem('masum_ecom_token');
    },
    loadUserFromStorage: (state) => {
      const savedUser = JSON.parse(localStorage.getItem('masum_ecom_user'));
      const savedToken = localStorage.getItem('masum_ecom_token');
      if (savedUser) {
        state.user = savedUser;
      }
      if (savedToken) {
        state.token = savedToken;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        } else {
          // Handle the case where payload is missing or not structured as expected
          state.error = 'Invalid response from the server';
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
