import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { toast } from 'sonner';
import { DeleteIcon, PenBoxIcon } from 'lucide-react';
import TooltipButton from '../shared/TooltipButton';

const ProductList = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch
  
  const discountedPrice = product.discount
  ? product.price - (product.price * (product.discount / 100))
  : product.price;


  // Handler to add product to the cart
  const handleAddToCart = () => {
    const toastId = toast.success(
      <div className='text-[18px] flex items-center justify-between'>
        <span className=''>
          <span className='text-blue-800 text-bold pr-1'>
            {product.name}
          </span>
          has been added to your cart!
        </span>

        <div
          className='bg-red-500 text-gray-100 cursor-pointer rounded-full ml-2 px-2 '
          onClick={() => toast.dismiss(toastId)}
        >
          X
        </div>
      </div>,
    );

    dispatch(addToCart(product)); // Dispatch addToCart action with the product
  };

  return (
    <motion.div
      className={` mt-10 1 flex flex-col items-center relative bg-white  rounded-lg shadow-md transition-transform duration-300 ease-in-out ${
        hovered ? ' shadow-lg ' : ''
      }`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="w-full h-[6.7em] sm:h-[10rem] relative mb-4 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{ scale: hovered ? 1.05 : 1 }} // Scale the image slightly
          transition={{ duration: 0.1 }}
        >
         <Image
           src={product?.images?.[0] || '/images/default_image.jepg'}  // Fallback to a default image
           alt={product?.name || 'Product Image'}  // Fallback for alt text
           layout="fill"
           objectFit="cover"
           className="rounded-lg"
          />
        </motion.div>
      </div>

      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>

      <div className="mt-2 text-blue-600 font-bold flex gap-2">
      
        {/* Display discounted price and regular price with line-through */}
        {product.discount > 0 && (
          <div className='flex flex-col '>
            <div className="text-blue-600 font-bold flex items-center gap-1">
            
             Tk {discountedPrice.toFixed(2)}
            </div>
            <div className="text-blue-400 line-through flex items-center justify-center gap-1">
          
               Tk {product.price.toFixed(2)}
            </div>
          </div>
        )}
        { product.discount <= 0  && <span>Tk {product.price.toFixed(2)}</span>}
      </div>


      {/* Show discount percentage if there's a discount */}
      {product.discount > 0 && (
        <div className="mt-1 text-sm text-blue-900 font-semibold bg-yellow-300 absolute right-5 top-3 py-2 px-1 rounded-full">
          -{product.discount.toFixed(0)}% 
        </div>
      )}

      {/* Edit Product and delete  button with event handler */}
     <div className="flex space-x-4 py-2">
        <TooltipButton
          label="Edit"
          tooltip="Edit this item"
          buttonClassName="bg-green-500 hover:bg-green-600" // Custom button styles
          tooltipClassName="bg-gray-800" // Custom tooltip styles
        />
        <TooltipButton
          label="Delete"
          tooltip="Delete this item"
          buttonClassName="bg-red-500 hover:bg-red-600" // Custom button styles
          tooltipClassName="bg-gray-800" // Custom tooltip styles
        />
      </div>
    </motion.div>
  );
};

export default ProductList;