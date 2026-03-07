import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap } from 'lucide-react';

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
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const buyNow = (e) => {
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to buy this product');
      navigate('/login');
      return;
    }
    
    const cart = [{ ...product, quantity: 1, selectedSize: 'M' }];
    localStorage.setItem('buyNowCart', JSON.stringify(cart));
    navigate('/checkout');
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer"
    >
      {showNotification && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Added to Cart!
        </div>
      )}

      <div className="relative h-72 bg-gray-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full hover:bg-white shadow-md transition-all"
        >
          <Heart 
            size={18} 
            className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`}
          />
        </button>

        {product.category && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
          <span className="text-xs text-green-600 font-semibold">23% off</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={addToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition-all font-semibold text-sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button 
            onClick={buyNow}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all font-semibold text-sm shadow-md"
          >
            <Zap size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
