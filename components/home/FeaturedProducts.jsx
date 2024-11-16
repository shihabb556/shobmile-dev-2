
import React from 'react';
import ProductCard from '../ProductCard';

const FeaturedProducts = () => {
  const products = [
    { 
      id: 1, 
      name: 'Radiant Skin Serum', 
      price: 29.99, 
      image: '/images/radiant_skine_serum.webp', 
      alt: 'Radiant Skin Serum'
    },
    { 
      id: 2, 
      name: 'Glow Moisturizer', 
      price: 24.99, 
      image: '/images/glow_most.webp', 
      alt: 'Glow Moisturizer'
    },
    { 
      id: 3, 
      name: 'Brightening Mask', 
      price: 19.99, 
      image: '/images/bright_mask.webp', 
      alt: 'Brightening Mask'
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
