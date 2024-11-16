import Image from "next/image";
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center space-y-10 md:space-y-0 py-[7rem] md:py-[0em]">
        {/* Text Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h1 className="text-5xl font-bold text-gray-900">
              Shop Everything You <span className="text-blue-600">Need</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              Discover a wide range of products for your home, office, and beyond. From electronics to groceries, we’ve got it all!
            </p>
          </div>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 mx-auto">
            Start Shopping
          </button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/images/multi-product-hero.webp"  // Replace with an image relevant to multiple product types
            alt="Various Products" 
            width={500} // specify appropriate width
            height={500} // specify appropriate height
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
