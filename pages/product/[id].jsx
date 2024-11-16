import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // assuming you're using React Router
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // Importing the cart action
import { fetchProductById } from '../redux/productSlice'; // Assuming you have a redux slice for fetching single product
import { Link } from 'react-router-dom'; // For navigation

const SingleProduct = () => {
  const { productId } = useParams(); // Extract product ID from the URL
  const dispatch = useDispatch();

  // Fetch product from Redux store
  const { product, status, error } = useSelector((state) => state.product); // Assuming your Redux state is structured this way

  // Fetch the product on page load
  useEffect(() => {
    dispatch(fetchProductById(productId)); // Action to fetch product by ID
  }, [dispatch, productId]);

  // Loading and error handling
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch action to add the product to the cart
  };

  return (
    <div className="container mx-auto my-6 p-4">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row items-start">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        {/* Product Info */}
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">Price: ${product.price}</p>
          <p className="mb-6 text-gray-700">
            {/* Placeholder for product description */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt
            magna vel orci aliquet, ut vehicula justo suscipit.
          </p>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Related Products Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Related Products</h3>
        {/* Related products will go here. You can fetch them based on category or tags */}
        {/* Assuming `relatedProducts` is available in your state */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts?.map((relatedProduct) => (
            <div key={relatedProduct.id} className="p-4 border rounded-lg">
              <Link to={`/products/${relatedProduct.id}`}>
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-auto mb-4 rounded-lg"
                />
                <h4 className="text-lg font-semibold">{relatedProduct.name}</h4>
                <p className="text-gray-700">${relatedProduct.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Back to Products List */}
      <div className="mt-8">
        <Link
          to="/products"
          className="text-blue-500 hover:underline"
        >
          &larr; Back to Products
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
