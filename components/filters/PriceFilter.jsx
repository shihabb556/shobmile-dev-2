import React from 'react';

const PriceFilter = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Price Range</h3>
      <div className="flex justify-between mb-2">
        <label className="flex flex-col">
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border border-gray-300 rounded p-2"
            placeholder="0"
          />
        </label>
        <label className="flex flex-col">
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border border-gray-300 rounded p-2"
            placeholder="100"
          />
        </label>
      </div>
      <div className="flex justify-between">
        <span>Min: ${minPrice || 0}</span>
        <span>Max: ${maxPrice || 100}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
