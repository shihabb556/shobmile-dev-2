import { createSlice } from '@reduxjs/toolkit';

// Get cart from local storage
const getInitialCart = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('masum_ecom_cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

// Utility function to update localStorage
const updateLocalStorage = (cart) => {
  localStorage.setItem('masum_ecom_cart', JSON.stringify(cart));
};

// Initial state
const initialState = {
  cartItems: getInitialCart(),
  totalQuantity: 0,
  totalPrice: 0,
  isCartOpen: false,
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);
    
      if (existingItem) {
        existingItem.quantity += item.quantity || 1; // Increment by the passed quantity or default to 1
      } else {
        state.cartItems.push({
          ...item,
          quantity: item.quantity || 1, // Default quantity to 1 when adding for the first time
        });
      }
    
      updateLocalStorage(state.cartItems);
      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state);
      state.isCartOpen = true;
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== itemId);
      updateLocalStorage(state.cartItems);
      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === itemId);

      if (item) {
        item.quantity = quantity;
        // Ensure quantity does not go below zero
        if (item.quantity < 0) {
          item.quantity = 0;
        }
      }
      updateLocalStorage(state.cartItems);
      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      updateLocalStorage(state.cartItems);
      // Reset totals
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    calculateTotals: (state) => {
      const { totalQuantity, totalPrice } = state.cartItems.reduce(
        (totals, item) => {
          totals.totalQuantity += item.quantity || 0;
          totals.totalPrice += (item.price * (item.quantity || 0)) || 0;
          return totals;
        },
        {
          totalQuantity: 0,
          totalPrice: 0,
        }
      );

      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice.toFixed(2);
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },
    
    initializeCart: (state) => {
      cartSlice.caseReducers.calculateTotals(state); // Calculate totals on initialization
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  calculateTotals,
  toggleCart,
  closeCart,
  initializeCart,
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
