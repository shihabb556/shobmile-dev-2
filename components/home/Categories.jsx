// components/CategoriesSection.js
import Category from './Category';

const Categories = () => {
  const categories = [
    { 
      id: 1, 
      name: 'Skincare', 
      image: '/images/category_skin_care.jpg', 
      description: 'Revitalize your skin with natural products.' 
    },
    { 
      id: 2, 
      name: 'Makeup', 
      image: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Discover the perfect shades for every look.' 
    },
    { 
      id: 3, 
      name: 'Fragrances', 
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Signature scents for every occasion.' 
    },
    { 
      id: 4, 
      name: 'Haircare', 
      image: 'https://images.pexels.com/photos/3992878/pexels-photo-3992878.jpeg?auto=compress&cs=tinysrgb&w=400', 
      description: 'Keep your hair healthy and shiny.' 
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Shop by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Category
              key={category.id}
              name={category.name}
              image={category.image}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

