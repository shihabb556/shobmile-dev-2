import { useEffect, useState } from "react";
import { debounce } from 'lodash';
import ProductCard from "@/components/ProductCard"; 
import FilterSidebar from "@/components/filters"; 
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setCurrentPage } from "@/redux/productSlice"; 
import { setSearchTerm, setPriceRange, resetFilters, setCategory } from "@/redux/filterSlice"; 
import { Menu, Search } from "lucide-react";
import Footer from "@/components/shared/Footer";
import { useRouter } from 'next/router';

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {  totalPages, currentPage } = useSelector((state) => state.products);
  const { searchTerm, minPrice, maxPrice, selectedCategory, sortOption } = useSelector((state) => state.filter);
  const { categories } = useSelector((state) => state.category);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [tempSearchTerm,setTempSearchTerm] = useState('');
  const { admin } = useSelector((state) => state?.admin || {});

  const token = admin?.token || null;
  const user = admin?.user || {};


  useEffect(() => {
    if( token && user?.role === 'admin'){
      router.push('/admin/products');
    };
  }, [router]);


  // Fetch products whenever filters or the current page changes
  // Fetch products whenever filters or the current page changes
  useEffect(() => {
    const fetchProductsData = async () => {
      if (!loading) { // Prevents multiple fetch calls while loading
        setLoading(true); // Set loading to true before fetching

        const result = await dispatch(fetchProducts({
          searchTerm,
          minPrice,
          maxPrice,
          category: selectedCategory,
          sortOption,
          page: currentPage,
          limit: 5,
        })).unwrap();

        // Set the loadedProducts based on the current page
        if (currentPage === 1) {
          setLoadedProducts(result?.products);
        } else {
          setLoadedProducts((prevProducts) => [...prevProducts, ...result?.products]);
        }

        setLoading(false); // Reset loading to false after fetching
      }
    };

    fetchProductsData();
  }, [dispatch, searchTerm, minPrice, maxPrice, selectedCategory, sortOption, currentPage]);

  // Reset loadedProducts and set currentPage to 1 when filters change
  useEffect(() => {
    setLoadedProducts([]); // Reset loadedProducts
    dispatch(setCurrentPage(1)); // Reset currentPage to 1
  }, [searchTerm, minPrice, maxPrice, selectedCategory, sortOption, dispatch]);

  // Debounced function to load more products
  const debouncedLoadMore = debounce(() => {
    if (!loading && currentPage < totalPages) { // Ensure it's not loading and there are more pages
      const nextPage = currentPage + 1;
      dispatch(setCurrentPage(nextPage));
    }
  }, 300);  // Debounce with 300ms delay

  // Load more products when "Load More" button is clicked
  const handleLoadMore = () => {
    debouncedLoadMore(); // Call debounced function
  };

 const handleSearch = ()=>{

  dispatch(setSearchTerm(tempSearchTerm));
 }

  // Reset filters
  const handleResetFilter = () => {
    dispatch(resetFilters());
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 pb-10 pt-[1em] md:px-4 relative">
        <FilterSidebar
          isOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => {
            dispatch(setCategory(category));
            setIsFilterOpen(false);
          }} 
          minPrice={minPrice}
          setMinPrice={(value) => dispatch(setPriceRange(value, maxPrice))}
          maxPrice={maxPrice}
          setMaxPrice={(value) => dispatch(setPriceRange(minPrice, value))}
        />
        <div className="flex justify-between  sticky top-0 md:top-[4em] z-[200] bg-gray-100 p-3 rounded">


        <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 text-blue-700 rounded hover:text-blue-600 transition  shadow bg-white "
          >
            <Menu className="scale-[1.1]
            hover:scale-[1.3]" /> 
          </button>

          <div className="flex rounded-full  bg-white rounded shadow ">
         
            <div className='border border-gray-200 rounded-l-full flex'>
              <input
                type="text"
                placeholder="Search products..."
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
                className="p-2 pl-3 md:w-full bg-transparent max-w-md"

                onKeyDown={(e) => {
                
                    
                  if (e.key == 'Enter') { // Check if Enter key is pressed
                  
                  dispatch(setSearchTerm(tempSearchTerm)); // Call handleSearch
                  }
                }}
              />
              {
                tempSearchTerm && (
                    <button onClick={() =>{ dispatch(setSearchTerm('')); setTempSearchTerm('') }} className="text-gray-500 px-3">X</button>
                 )
               }
            </div>
            <button 
              onClick={ handleSearch}
              className="text-blue-700 border px-2 hover:text-blue-600 rounded-r-full  ">
                  <Search className="hover:scale-[1.1]" />
            </button>
            
          </div>
    
        </div>

        {/* Selected Category Display */}
        {selectedCategory && (
          <button className=" mt-5 ml-2 mb-3  text-gray-700 rounded transition">
         <span className="font-bold"> Category:</span> {selectedCategory} <span onClick={handleResetFilter} className="bg-gray-300 text-red-500 ml-3 px-2 py-1 rounded-full">X</span>
          </button>
        )}

        <div className="grid px-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          
        {loadedProducts && loadedProducts?.length > 0 && (
            loadedProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) }
          
        
        </div> 
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center p-4 text-gray-500">
          { loading &&  <button className="block mx-auto  my-[5em]  text-xl text-blue-700">Loading..</button>  }
          { !loading && loadedProducts.length == 0 && 'Products not available' }
        </div>     


        {loadedProducts && totalPages > currentPage && (
            <button onClick={handleLoadMore} className="block mx-auto my-[5em]  px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-xl">
              Load more
            </button>            
        )}
      </div>

      <Footer/>
    </>
  );
};

export default Products;
