import { resetFilters } from '@/redux/filterSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import CategoryFilter from './CategoryFilter';
import { DeleteIcon } from 'lucide-react';

const FilterSidebar = ({
  setIsFilterOpen,
  isOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) => {
  const dispatch = useDispatch();

  const handleResetFilter = () => {
    dispatch(resetFilters());
    setIsFilterOpen(false);
  };

  return (
    <div
      className={`z-[2600] fixed top-0 left-0 h-[100vh] md:h-full w-[70vw] md:w-[40vw] lg:w-[22rem] bg-white shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 pt-5 ">
        <div className="flex items-center justify-between">
          <h3 className="t font-bold mb-4 text-2xl">Filters</h3>
          <button
            className="text-red-600  rounded "
            onClick={() => setIsFilterOpen(false)}
          >
            <DeleteIcon className='w-8 h-8 hover:scale-[1.1]' />
          </button>
        </div>

        {/* Price Filter
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Price</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div> */}

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      </div>



    </div>
  );
};

export default FilterSidebar;
