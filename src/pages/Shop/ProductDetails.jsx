import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSingleProduct } from '../services/productApi';
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Sparkles } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getSingleProduct(id);
      
      // Dummy data fallback
      const dummyProduct = {
        _id: id,
        name: 'Premium Cotton Formal Shirt',
        category: 'Single',
        type: 'Formal Shirt',
        price: 899,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
        description: 'Experience the perfect blend of comfort and style with our premium cotton formal shirt. Expertly stitched by our master tailors with attention to every detail.',
        fabric: 'Pure Cotton',
        color: 'White',
        features: ['Wrinkle-free fabric', 'Breathable material', 'Perfect collar stitching', 'Durable buttons', 'Machine washable']
      };
      
      setProduct(data._id ? data : dummyProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      quantity
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-10 w-10 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all">
            <ArrowLeft size={20} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button 
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left: Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                <Sparkles size={16} />
                {product.category}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h1 className="text-4xl font-black text-gray-900 mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{product.price}
                </span>
                <span className="text-gray-500 line-through text-xl">₹{Math.round(product.price * 1.3)}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100)}% OFF
                </span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-8 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <p className="text-sm text-blue-600 font-medium mb-1">Fabric</p>
                  <p className="text-lg font-bold text-blue-900">{product.fabric}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <p className="text-sm text-purple-600 font-medium mb-1">Color</p>
                  <p className="text-lg font-bold text-purple-900">{product.color}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <p className="text-sm text-green-600 font-medium mb-1">Type</p>
                  <p className="text-lg font-bold text-green-900">{product.type}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                  <p className="text-sm text-orange-600 font-medium mb-1">Category</p>
                  <p className="text-lg font-bold text-orange-900">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && (
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="bg-green-100 rounded-full p-1">
                        <Check size={16} className="text-green-600" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Select Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={24} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
