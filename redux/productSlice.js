import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest, BASE_URL } from '../utils/api';
import axios from 'axios';







// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ searchTerm, minPrice, maxPrice, category, sortOption, page, limit }, { rejectWithValue }) => {

    try {
      const result = await axios.get(`${BASE_URL}/products`, {
        params: {
          searchTerm,
          minPrice,
          maxPrice,
          category,
          sortOption,
          page,
          limit,
        },
      });

      return {
        products: result.data.products, // List of products
        currentPage: result.data.currentPage, // Current page number
        totalPages: result.data.totalPages, // Total pages available
        totalProducts: result.data.totalProducts, // Total number of products
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



// Fetch single product by ID
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id, { rejectWithValue }) => {
    try {
      const result = await apiRequest(`/products/${id}`, 'GET');
      return result.product;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Add a product (for recruiters/admin)
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue, dispatch }) => {
    try {
      const result = await apiRequest('/products', 'POST', productData);
      dispatch(fetchProducts()); // Refresh product list after adding
      return result.product;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Initial state for products
const initialState = {
  products: [],
  singleProduct: null,
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0, // Initialize total products
  loading: false,
  error: null,
};


// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.products)
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage; // Update current page
        state.totalPages = action.payload.totalPages; // Update total pages
        state.totalProducts = action.payload.totalProducts; // Update total products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add a product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the action
export const { setCurrentPage } = productSlice.actions;

// Export reducer to use in store
export default productSlice.reducer;
