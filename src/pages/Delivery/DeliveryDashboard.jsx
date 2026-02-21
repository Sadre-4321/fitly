import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../services/orderApi';
import { Package, MapPin, Phone, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchDeliveryOrders();
  }, []);

  const fetchDeliveryOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      // Filter only shipped and out for delivery orders
      const deliveryOrders = data.filter(order => 
        ['Shipped', 'Out for Delivery'].includes(order.status)
      );
      setOrders(deliveryOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async (orderId) => {
    try {
      setUpdating(orderId);
      await updateOrderStatus(orderId, 'Out for Delivery');
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Out for Delivery' } : order
      ));
      alert('Order marked as picked up!');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const handleDeliver = async (orderId) => {
    if (window.confirm('Confirm delivery? This action cannot be undone.')) {
      try {
        setUpdating(orderId);
        await updateOrderStatus(orderId, 'Delivered');
        setOrders(orders.filter(order => order._id !== orderId));
        alert('Order marked as delivered!');
      } catch (error) {
        console.error('Failed to update status:', error);
        alert('Failed to update status');
      } finally {
        setUpdating(null);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

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
          <div className="flex items-center gap-4 mb-4">
            <Truck size={48} className="text-white" />
            <div>
              <h1 className="text-4xl font-black text-white">Delivery Dashboard</h1>
              <p className="text-white/90 text-lg">Assigned Orders: {orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            {['All', 'Shipped', 'Out for Delivery'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Package size={80} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Available</h3>
            <p className="text-gray-600">All deliveries are completed!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="text-xl font-bold text-gray-800">#{order._id?.slice(-8).toUpperCase()}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Info */}
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <MapPin className="text-blue-600" size={24} />
                          <h3 className="font-bold text-gray-800">Delivery Address</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          <span className="font-bold">{order.shippingAddress?.fullName}</span><br />
                          {order.shippingAddress?.address}<br />
                          {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                          PIN: {order.shippingAddress?.pincode}
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Phone className="text-green-600" size={24} />
                          <h3 className="font-bold text-gray-800">Contact</h3>
                        </div>
                        <p className="text-lg font-bold text-gray-800">{order.shippingAddress?.phone}</p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                      <div className="bg-purple-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <CreditCard className="text-purple-600" size={24} />
                          <h3 className="font-bold text-gray-800">Payment Details</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Method</span>
                            <span className="font-bold text-gray-800">{order.paymentMethod || 'COD'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount</span>
                            <span className="text-2xl font-black text-purple-600">₹{order.totalAmount}</span>
                          </div>
                          {order.paymentMethod === 'COD' && (
                            <div className="mt-3 p-3 bg-orange-100 rounded-lg">
                              <p className="text-sm font-bold text-orange-700">⚠️ Collect ₹{order.totalAmount} cash</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Package className="text-gray-600" size={24} />
                          <h3 className="font-bold text-gray-800">Items</h3>
                        </div>
                        <p className="text-gray-700">{order.items?.length || 0} item(s) in package</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t">
                    {order.status === 'Shipped' && (
                      <button
                        onClick={() => handlePickup(order._id)}
                        disabled={updating === order._id}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50"
                      >
                        <Truck size={24} />
                        {updating === order._id ? 'Updating...' : 'Mark as Picked Up'}
                      </button>
                    )}
                    
                    {order.status === 'Out for Delivery' && (
                      <button
                        onClick={() => handleDeliver(order._id)}
                        disabled={updating === order._id}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-lg disabled:opacity-50"
                      >
                        <CheckCircle size={24} />
                        {updating === order._id ? 'Updating...' : 'Mark as Delivered'}
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="px-6 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all"
                    >
                      View Details
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

export default DeliveryDashboard;
