import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; // Importing the cart action
import { fetchSingleProduct } from '@/redux/productSlice';
import Link from 'next/link';

const SingleProduct = () => {
  const router = useRouter(); // Initialize useRouter
  const { id } = router.query; // Get id from the URL query params
  const dispatch = useDispatch();
    
  console.log('id',id)
  // Fetch product from Redux store
  const { singleProduct, loading, error } = useSelector((state) => state.products);

  // Fetch the product when id is available
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  // Add to cart handler
  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(addToCart(singleProduct)); // Pass the product to add to the cart
    }
  };

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto my-6 p-4">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row items-start">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 p-4">
          <img
            src={singleProduct.images[0]}
            alt={singleProduct.name}
            className="w-full h-[18em] lg:h-[24em] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4">{singleProduct.name}</h2>
          <p className="text-lg mb-4">Price: TK {singleProduct.price}</p>

            {/* Add to Cart Button */}
          <div className='flex gap-4'>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
            >
             Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>

          </div>

          <h3 className='mt-4 font-bold'>Description:</h3>
          <p className="ml-2 mb-6 text-gray-700">{singleProduct.description}</p>

        
        </div>
      </div>

      {/* Back to Products List */}
      <div className="my-8 ">
        <Link href="/">
          <p className="text-blue-500 hover:underline">&larr; Back to Products</p>
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
