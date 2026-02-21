import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = (e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, selectedSize: 'M' });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const buyNow = (e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer relative"
    >
      {/* Notification */}
      {showNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          ✓ Added to Cart!
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white transition-all shadow-md"
      >
        <Heart 
          size={20} 
          className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`}
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden h-72 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          {product.category}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold">4.5</span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.fabric && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
              {product.fabric}
            </span>
          )}
          {product.color && (
            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
              {product.color}
            </span>
          )}
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-black text-indigo-600">₹{product.price}</span>
          <span className="text-sm text-gray-500 line-through ml-2">₹{Math.round(product.price * 1.3)}</span>
          <span className="text-sm text-green-600 font-semibold ml-2">23% off</span>
        </div>

        {/* Action Buttons - Flipkart Style */}
        <div className="flex gap-2">
          <button 
            onClick={addToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-bold shadow-md hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button 
            onClick={buyNow}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-bold shadow-md hover:shadow-lg"
          >
            <Zap size={18} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
