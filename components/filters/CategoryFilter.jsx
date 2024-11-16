import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const CategoryFilter = ({ categories = [], selectedCategory, setSelectedCategory }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const handleCategoryClick = (subcategory) => {
    setSelectedCategory(subcategory); // Set the selected subcategory
  };

  return (
    <div className="mb-4 mt-5">
      <div className="pl-2 overflow-y-auto max-h-[75vh]">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.name} className="mb-2 border border-gray-300">
              <h4
                className={`flex items-center cursor-pointer p-1 text-xl `}
                onClick={() => toggleCategory(category.name)}
              >
                {openCategory === category.name ? (
                  <ChevronUpIcon className="mr-2" />
                ) : (
                  <ChevronDownIcon className="mr-2" />
                )}
                {category.name}
              </h4>
              {openCategory === category.name && (
                <div className="flex flex-col pl-4">
                  {category.subcategories.map((subcategory) => (
                    <label
                      key={subcategory}
                      className={`flex items-center text-left mr-2 mb-2 px-4 py-2 rounded border border-gray-300 text-[17px] ${
                        selectedCategory === subcategory ? 'text-blue-800' : 'bg-white text-black'
                      }`}
                    >
                      <input
                        type="radio"
                        name="subcategory"
                        value={subcategory}
                        checked={selectedCategory === subcategory}
                        onChange={() => handleCategoryClick(subcategory)}
                        className="mr-2"
                      />
                      {subcategory}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No Categories Available</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
