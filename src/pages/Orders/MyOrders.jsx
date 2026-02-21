import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/orderApi';
import { Package, Calendar, CreditCard, Eye, ShoppingBag } from 'lucide-react';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block p-8 bg-white/60 backdrop-blur rounded-3xl mb-6">
            <ShoppingBag size={80} className="text-indigo-300 mx-auto" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8 text-lg">Start shopping to see your orders here!</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">My Orders</h1>
          <p className="text-white/90 text-lg">{orders.length} order(s) found</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="font-bold text-gray-800">#{order._id?.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={18} />
                      <span className="text-sm">{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusColor(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
                    >
                      <Eye size={18} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Items Preview */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Package size={20} className="text-indigo-600" />
                      Items ({order.items?.length || 0})
                    </h3>
                    <div className="space-y-2">
                      {order.items?.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity} | Size: {item.size}</p>
                          </div>
                          <p className="font-bold text-indigo-600">₹{item.price}</p>
                        </div>
                      ))}
                      {order.items?.length > 2 && (
                        <p className="text-sm text-gray-500 mt-2">+ {order.items.length - 2} more item(s)</p>
                      )}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard size={20} className="text-indigo-600" />
                        <h3 className="font-bold text-gray-800">Payment Details</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method</span>
                          <span className="font-semibold text-gray-800">{order.paymentMethod || 'COD'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Status</span>
                          <span className={`font-semibold ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                            {order.paymentStatus || 'Pending'}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-bold text-gray-800">Total Amount</span>
                          <span className="text-2xl font-black text-indigo-600">₹{order.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="font-bold text-gray-800 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-700">
                        {order.shippingAddress?.fullName}<br />
                        {order.shippingAddress?.address}<br />
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}<br />
                        Phone: {order.shippingAddress?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
