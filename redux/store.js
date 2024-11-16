import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import productReducer from './productSlice'; 
import cartReducer from './cartSlice'; 
import categoryReducer from './categorySlice'; 
import  filterReducer from './filterSlice'; 
import guestUserReducer from './guestUserSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    guestUser: guestUserReducer,
    cart: cartReducer,
    category: categoryReducer,
    filter: filterReducer,
    admin:adminReducer
  },
});

export default store;
