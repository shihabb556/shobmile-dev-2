// components/Category.js
import { motion } from 'framer-motion';
import Image from 'next/image';

const Category = ({ name, image, description }) => {
  return (
    <motion.div
      className="rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={image}
        alt={name}
        width={400} 
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 bg-white text-center">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Shop {name}
        </button>
      </div>
    </motion.div>
  );
};

export default Category;
