import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productApi';
import ProductCard from '../../Components/ProductCard';
import { Search, ChevronDown } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOrder, setSortOrder] = useState('');

  const categories = [
    { name: 'All', label: 'All Products' },
    { name: 'Single', label: 'Single Items' },
    { name: 'Pair', label: 'Pair Sets' }
  ];

  const singleTypes = ['Formal Shirt', 'Formal Pant', 'Boot Cut Pant', 'Baggy Pant', 'Narrow Fit Pant', 'Straight Fit Pant'];
  const pairTypes = ['Shirt Pant Set', '2 Piece Suit', '3 Piece Suit', 'Kurta Pajama'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, selectedType, priceRange, sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Dummy data - will show immediately
      const dummyProducts = [
        // Single Items - Formal Shirts
        { _id: '1', name: 'Premium Cotton Formal Shirt', category: 'Single', type: 'Formal Shirt', price: 899, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIQaHj9UXfnCSa9pYC8ij1OhOScy2S7f5gGg&s', description: '100% Cotton, Wrinkle-free, Perfect fit', fabric: 'Pure Cotton', color: 'White' },
        { _id: '2', name: 'Slim Fit Formal Shirt', category: 'Single', type: 'Formal Shirt', price: 799, image: 'https://via.placeholder.com/500x600/6366F1/FFFFFF?text=Slim+Fit+Shirt', description: 'Poly-Cotton blend, Slim fit design', fabric: 'Poly-Cotton', color: 'Blue' },
        
        // Single Items - Formal Pants
        { _id: '3', name: 'Classic Formal Pant', category: 'Single', type: 'Formal Pant', price: 1299, image: 'https://via.placeholder.com/500x600/8B5CF6/FFFFFF?text=Formal+Pant', description: 'Premium fabric, Comfortable fit', fabric: 'Polyester Blend', color: 'Black' },
        { _id: '4', name: 'Straight Fit Formal Pant', category: 'Single', type: 'Straight Fit Pant', price: 1199, image: 'https://via.placeholder.com/500x600/A78BFA/FFFFFF?text=Straight+Fit', description: 'Straight cut, Office wear', fabric: 'Cotton Blend', color: 'Grey' },
        
        // Single Items - Boot Cut
        { _id: '5', name: 'Boot Cut Formal Pant', category: 'Single', type: 'Boot Cut Pant', price: 1399, image: 'https://via.placeholder.com/500x600/EC4899/FFFFFF?text=Boot+Cut', description: 'Boot cut style, Modern look', fabric: 'Cotton', color: 'Navy Blue' },
        
        // Single Items - Baggy
        { _id: '6', name: 'Baggy Fit Pant', category: 'Single', type: 'Baggy Pant', price: 1499, image: 'https://via.placeholder.com/500x600/F472B6/FFFFFF?text=Baggy+Fit', description: 'Relaxed fit, Trendy style', fabric: 'Denim Mix', color: 'Khaki' },
        
        // Single Items - Narrow Fit
        { _id: '7', name: 'Narrow Fit Pant', category: 'Single', type: 'Narrow Fit Pant', price: 1099, image: 'https://via.placeholder.com/500x600/14B8A6/FFFFFF?text=Narrow+Fit', description: 'Slim narrow fit, Sharp look', fabric: 'Stretch Cotton', color: 'Charcoal' },
        
        // Pair Sets - Shirt Pant
        { _id: '8', name: 'Executive Shirt Pant Set', category: 'Pair', type: 'Shirt Pant Set', price: 2499, image: 'https://via.placeholder.com/500x600/10B981/FFFFFF?text=Shirt+Pant+Set', description: 'Complete formal set, Premium stitching', fabric: 'Cotton Blend', color: 'White & Black' },
        { _id: '9', name: 'Business Casual Set', category: 'Pair', type: 'Shirt Pant Set', price: 2299, image: 'https://via.placeholder.com/500x600/3B82F6/FFFFFF?text=Business+Set', description: 'Smart casual combo', fabric: 'Poly-Cotton', color: 'Blue & Grey' },
        
        // Pair Sets - 2 Piece
        { _id: '10', name: 'Classic 2 Piece Suit', category: 'Pair', type: '2 Piece Suit', price: 4999, image: 'https://via.placeholder.com/500x600/EF4444/FFFFFF?text=2+Piece+Suit', description: 'Blazer + Pant, Wedding ready', fabric: 'Premium Wool Blend', color: 'Charcoal Grey' },
        { _id: '11', name: 'Modern 2 Piece Suit', category: 'Pair', type: '2 Piece Suit', price: 5499, image: 'https://via.placeholder.com/500x600/F59E0B/FFFFFF?text=Modern+Suit', description: 'Slim fit blazer set', fabric: 'Italian Fabric', color: 'Navy Blue' },
        
        // Pair Sets - 3 Piece
        { _id: '12', name: 'Royal 3 Piece Suit', category: 'Pair', type: '3 Piece Suit', price: 7999, image: 'https://via.placeholder.com/500x600/7C3AED/FFFFFF?text=3+Piece+Suit', description: 'Blazer + Vest + Pant, Premium quality', fabric: 'Wool Blend', color: 'Black' },
        { _id: '13', name: 'Wedding 3 Piece Suit', category: 'Pair', type: '3 Piece Suit', price: 8999, image: 'https://via.placeholder.com/500x600/DB2777/FFFFFF?text=Wedding+Suit', description: 'Complete wedding attire', fabric: 'Premium Silk Blend', color: 'Midnight Blue' },
        
        // Pair Sets - Kurta Pajama
        { _id: '14', name: 'Designer Kurta Pajama', category: 'Pair', type: 'Kurta Pajama', price: 3499, image: 'https://via.placeholder.com/500x600/F97316/FFFFFF?text=Designer+Kurta', description: 'Wedding special, Embroidered design', fabric: 'Silk Cotton', color: 'Cream Gold' },
        { _id: '15', name: 'Premium Kurta Set', category: 'Pair', type: 'Kurta Pajama', price: 2999, image: 'https://via.placeholder.com/500x600/06B6D4/FFFFFF?text=Premium+Kurta', description: 'Festive wear, Elegant look', fabric: 'Pure Cotton', color: 'White' },
        { _id: '16', name: 'Royal Wedding Kurta', category: 'Pair', type: 'Kurta Pajama', price: 4999, image: 'https://via.placeholder.com/500x600/8B5CF6/FFFFFF?text=Royal+Kurta', description: 'Heavy embroidery, Wedding collection', fabric: 'Silk Blend', color: 'Maroon Gold' }
      ];
      
      try {
        const data = await getAllProducts();
        const finalData = (data && data.length > 0) ? data : dummyProducts;
        setProducts(finalData);
        setFilteredProducts(finalData);
      } catch (apiError) {
        // If API fails, use dummy data
        console.log('Using dummy data:', apiError);
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-10 w-10 bg-indigo-100 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-4">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Premium Stitched Collection
          </h1>
          <p className="text-lg text-white/90 font-light">Tailored perfection for Men & Boys</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters (Flipkart Style) */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="p-6 border-b">
                <h3 className="font-semibold text-gray-800 mb-4 uppercase text-sm">Category</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.name} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.name}
                        onChange={() => {
                          setSelectedCategory(cat.name);
                          setSelectedType('All');
                        }}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-indigo-600">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              {selectedCategory !== 'All' && (
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-800 mb-4 uppercase text-sm">Type</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === 'All'}
                        onChange={() => setSelectedType('All')}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-indigo-600">All Types</span>
                    </label>
                    {(selectedCategory === 'Single' ? singleTypes : pairTypes).map((type) => (
                      <label key={type} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="type"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(type)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-indigo-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4 uppercase text-sm">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Search & Sort Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-lg font-medium text-gray-700 focus:border-indigo-500 focus:outline-none cursor-pointer bg-white"
                  >
                    <option value="">Sort by Relevance</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <div className="inline-block p-8">
                  <svg className="mx-auto h-24 w-24 text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">No Products Found</h3>
                  <p className="text-gray-500 text-lg">Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
