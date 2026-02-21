import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../services/orderApi';
import { Package, MapPin, Calendar, CreditCard, Eye, Truck } from 'lucide-react';

const PickupOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [picking, setPicking] = useState(null);

  useEffect(() => {
    fetchPickupOrders();
  }, []);

  const fetchPickupOrders = async () => {
    try {   
      setLoading(true);
      const data = await getAllOrders();
      // Filter only shipped orders (ready for pickup)
      const pickupReady = data.filter(order => order.status === 'Shipped');
      setOrders(pickupReady);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async (orderId) => {
    try {
      setPicking(orderId);
      await updateOrderStatus(orderId, 'Out for Delivery');
      setOrders(orders.filter(order => order._id !== orderId));
      alert('Order picked up successfully!');
    } catch (error) {
      console.error('Failed to pickup order:', error);
      alert('Failed to pickup order');
    } finally {
      setPicking(null);
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Package size={48} className="text-white" />
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Pickup Orders</h1>
              <p className="text-white/90 text-lg">Orders ready for pickup: {orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Package size={80} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders for Pickup</h3>
            <p className="text-gray-600">All orders have been picked up!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="text-xl font-bold text-gray-800">#{order._id?.slice(-8).toUpperCase()}</p>
                    </div>
                    <span className="px-4 py-2 rounded-full font-bold bg-purple-100 text-purple-700">
                      Ready for Pickup
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6 space-y-4">
                  {/* Customer Info */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <MapPin size={18} className="text-blue-600" />
                      Customer Details
                    </h3>
                    <p className="font-bold text-gray-800">{order.shippingAddress?.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.shippingAddress?.city}, {order.shippingAddress?.state}
                    </p>
                  </div>

                  {/* Pickup Location */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Package size={18} className="text-green-600" />
                      Pickup Location
                    </h3>
                    <p className="text-gray-700">Tailor Shop - Main Store</p>
                    <p className="text-sm text-gray-600">123 Fashion Street, City Center</p>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} className="text-orange-600" />
                        <span className="font-bold text-gray-800">{order.paymentMethod || 'COD'}</span>
                      </div>
                      <span className="text-2xl font-black text-orange-600">₹{order.totalAmount}</span>
                    </div>
                    {order.paymentMethod === 'COD' && (
                      <p className="text-xs text-orange-700 mt-2 font-semibold">⚠️ Collect cash on delivery</p>
                    )}
                  </div>

                  {/* Items Count */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-bold text-gray-800">{order.items?.length || 0} item(s)</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handlePickup(order._id)}
                      disabled={picking === order._id}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg disabled:opacity-50"
                    >
                      <Truck size={20} />
                      {picking === order._id ? 'Picking...' : 'Start Pickup'}
                    </button>
                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all"
                    >
                      <Eye size={20} />
                    </button>
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

export default PickupOrders;
