import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderApi';
import { getUserProfile } from '../services/authApi';
import { MapPin, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD'
  });

  useEffect(() => {
    // Check for Buy Now cart first, then regular cart
    const buyNowCart = JSON.parse(localStorage.getItem('buyNowCart') || '[]');
    const regularCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cart = buyNowCart.length > 0 ? buyNowCart : regularCart;
    
    if (cart.length === 0) {
      navigate('/cart');
    }
    setCartItems(cart);
    
    // Clear buyNowCart after loading
    if (buyNowCart.length > 0) {
      localStorage.removeItem('buyNowCart');
    }
    
    // Fetch user profile with saved addresses
    fetchUserProfile();
  }, [navigate]);
  
  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      
      if (profile.addresses && profile.addresses.length > 0) {
        setSavedAddresses(profile.addresses);
        
        // Find default address or use first one
        const defaultIndex = profile.addresses.findIndex(addr => addr.isDefault);
        const selectedIndex = defaultIndex >= 0 ? defaultIndex : 0;
        setSelectedAddressIndex(selectedIndex);
        
        // Auto-fill form with selected address
        const addr = profile.addresses[selectedIndex];
        setFormData({
          fullName: addr.name,
          phone: addr.phone,
          address: addr.street,
          city: addr.city,
          state: addr.state,
          pincode: addr.pincode,
          paymentMethod: 'COD'
        });
      }
    } catch (error) {
      console.log('No saved addresses found');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          image: item.image
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: calculateTotal()
      };

      try {
        await createOrder(orderData);
      } catch (apiError) {
        console.log('API not available, proceeding with local order');
      }
      
      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));
      setOrderPlaced(true);
      
      setTimeout(() => {
        navigate('/order-success');
      }, 2000);
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block p-8 bg-white rounded-3xl shadow-2xl mb-6">
            <CheckCircle size={80} className="text-green-500 mx-auto animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully! 🎉</h2>
          <p className="text-gray-600 text-lg">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white">Checkout</h1>
          <p className="text-white/90 mt-2">Complete your order</p>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address - Flipkart Style */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-indigo-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                >
                  + Add New Address
                </button>
              </div>
              
              {savedAddresses.length > 0 ? (
                <div className="space-y-4">
                  {savedAddresses.map((addr, index) => (
                    <label
                      key={index}
                      className={`block p-5 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedAddressIndex === index
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => {
                        setSelectedAddressIndex(index);
                        setFormData({
                          fullName: addr.name,
                          phone: addr.phone,
                          address: addr.street,
                          city: addr.city,
                          state: addr.state,
                          pincode: addr.pincode,
                          paymentMethod: formData.paymentMethod
                        });
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressIndex === index}
                          onChange={() => {}}
                          className="mt-1 w-5 h-5 text-indigo-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-gray-800">{addr.addressType}</span>
                            {addr.isDefault && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-700">{addr.name}</p>
                          <p className="text-gray-600 text-sm">{addr.phone}</p>
                          <p className="text-gray-600 text-sm mt-1">
                            {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No saved addresses found</p>
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                  >
                    Add Your First Address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-indigo-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <Banknote className="text-green-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={formData.paymentMethod === 'UPI'}
                    onChange={handleChange}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <Wallet className="text-purple-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">UPI Payment</p>
                    <p className="text-sm text-gray-500">PhonePe, GPay, Paytm</p>
                  </div>
                </label>
                
                <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-all">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={formData.paymentMethod === 'Card'}
                    onChange={handleChange}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <CreditCard className="text-blue-600" size={24} />
                  <div>
                    <p className="font-bold text-gray-800">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Visa, Mastercard, Rupay</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-indigo-600">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{calculateTotal()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
              
              {/* Edit Profile Link */}
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Edit Profile & Addresses
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
