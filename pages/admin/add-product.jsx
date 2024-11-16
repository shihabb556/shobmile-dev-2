import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // If you're using Redux
import { apiRequest } from '@/utils/api';  // Custom API request utility
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import UploadImages from '@/components/admin_comps/UploadImages';

const AddProduct = () => {
  const dispatch = useDispatch();  // Optional, for dispatching any action
  const router = useRouter();

  const { admin } = useSelector((state) => state?.admin || {});

  // Destructure token and user from admin
  const token = admin?.token || null;
  
  // State for form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState(1);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  console.log('out uploaded image urls',uploadedImageUrls);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('uploaded image urls',uploadedImageUrls);
    // Creating product data
    const productData = {
      name,
      description,
      price,
      discount,
      stock,
      lowStockAlert,
      category,
      subCategory,
      brand,
      images: uploadedImageUrls,
    };

    try {
      // API request to add product
      const response = await apiRequest('/products', 'POST', productData,token);
      toast.success('Product added successfully!');
      console.log(response)
      router.push('/admin/products');  // Redirect to products page after adding
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Discount */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="stock">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Low Stock Alert */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="lowStockAlert">Low Stock Alert Threshold</label>
          <input
            type="number"
            id="lowStockAlert"
            value={lowStockAlert}
            onChange={(e) => setLowStockAlert(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Subcategory */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="subCategory">Subcategory</label>
          <input
            type="text"
            id="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1" htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <UploadImages
           uploadedImageUrls={uploadedImageUrls}
           setUploadedImageUrls={setUploadedImageUrls}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
