import { createSlice } from '@reduxjs/toolkit';

// Initial state for filters
const initialState = {
  searchTerm: '',
  minPrice: 0,
  maxPrice: 10000, // Increased default maxPrice to cover most products
  selectedCategory: '',
  sortOption: 'newToFirst', // Sort by 'lowToHigh' or 'highToLow or newToFirst' 
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.minPrice = 0;
      state.maxPrice = 10000;
      state.selectedCategory = '';
      state.sortOption = '';
    },
  },
});

export const {
  setSearchTerm,
  setPriceRange,
  setCategory,
  setSortOption,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
