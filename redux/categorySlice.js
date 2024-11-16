import { createSlice } from '@reduxjs/toolkit';

const categories = [
    {
      name: "Electronics",
      subcategories: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Cameras",
        "Headphones",
        "Smartwatches",
        "Home Appliances"
      ]
    },
    {
      name: "Clothing & Fashion",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Accessories",
        "Jewelry",
        "Sunglasses"
      ]
    },
    {
      name: "Health & Beauty",
      subcategories: [
        "Skincare",
        "Haircare",
        "Makeup",
        "Fragrances",
        "Personal Care",
        "Supplements"
      ]
    },
    {
      name: "Home & Furniture",
      subcategories: [
        "Living Room Furniture",
        "Bedroom Furniture",
        "Kitchen & Dining",
        "Home Decor",
        "Lighting",
        "Storage Solutions"
      ]
    },
    {
      name: "Sports & Outdoors",
      subcategories: [
        "Exercise Equipment",
        "Sportswear",
        "Camping & Hiking Gear",
        "Bicycles",
        "Fitness Accessories"
      ]
    },
    {
      name: "Toys & Games",
      subcategories: [
        "Action Figures",
        "Board Games",
        "Puzzles",
        "Educational Toys",
        "Outdoor Toys"
      ]
    },
    {
      name: "Books & Stationery",
      subcategories: [
        "Fiction",
        "Non-Fiction",
        "Children's Books",
        "Office Supplies",
        "Art Supplies"
      ]
    },
    {
      name: "Groceries",
      subcategories: [
        "Fruits & Vegetables",
        "Dairy & Eggs",
        "Meat & Seafood",
        "Snacks",
        "Beverages",
        "Baking Essentials"
      ]
    },
    {
      name: "Health & Medical Supplies",
      subcategories: [
        "Medicines",
        "First Aid",
        "PPE",
        "Wellness Products"
      ]
    },
    {
      name: "Automotive",
      subcategories: [
        "Car Accessories",
        "Motorbike Gear",
        "Car Care Products",
        "Auto Parts"
      ]
    },
    {
      name: "Pet Supplies",
      subcategories: [
        "Pet Food",
        "Pet Toys",
        "Pet Grooming",
        "Pet Beds"
      ]
    },
    {
      name: "Office Supplies",
      subcategories: [
        "Office Furniture",
        "Printers & Scanners",
        "Office Storage",
        "Organization"
      ]
    },
    {
      name: "Garden & Outdoor",
      subcategories: [
        "Plants & Seeds",
        "Gardening Tools",
        "Outdoor Furniture",
        "Grills & Outdoor Cooking"
      ]
    },
    {
      name: "Jewelry & Watches",
      subcategories: [
        "Rings",
        "Necklaces",
        "Watches",
        "Bracelets"
      ]
    }
  ];

const initialState = {
    categories
}
  

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
