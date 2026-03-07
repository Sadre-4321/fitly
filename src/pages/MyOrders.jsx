import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, X, MapPin, CreditCard } from 'lucide-react';
import { getMyOrders } from './services/orderApi';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="text-green-500" size={24} />;
      case 'Processing': return <Clock className="text-yellow-500" size={24} />;
      case 'Shipped': return <Truck className="text-blue-500" size={24} />;
      case 'Cancelled': return <X className="text-red-500" size={24} />;
      default: return <Package className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your orders</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => window.location.href = '/shop'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-800">Order #{order._id.slice(-8).toUpperCase()}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <img 
                          src={item.image || 'https://via.placeholder.com/80'} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            {item.size && <span>Size: {item.size}</span>}
                            <span>Qty: {item.quantity}</span>
                            <span className="font-semibold text-blue-600">₹{item.price}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-gray-400 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Shipping Address</p>
                        <p className="text-sm text-gray-600">{order.shippingAddress.fullName}</p>
                        <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Total */}
                  <div className="border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CreditCard size={18} className="text-gray-400" />
                      <span>Payment: {order.paymentMethod}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-600">₹{order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
