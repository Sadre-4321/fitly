import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../services/orderApi';
import { Package, Calendar, User, Eye, RefreshCw, Filter } from 'lucide-react';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdating(orderId);
      await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdating(null);
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

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === filterStatus.toLowerCase());

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">Manage Orders</h1>
          <p className="text-white/90 text-lg">Total Orders: {orders.length}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="text-indigo-600" size={24} />
            <span className="font-bold text-gray-800">Filter by Status:</span>
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
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

        {/* Orders Table/Cards */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Package size={80} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-600">No orders match the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div className="p-6">
                  <div className="grid md:grid-cols-6 gap-4 items-center">
                    {/* Order ID */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order ID</p>
                      <p className="font-bold text-gray-800">#{order._id?.slice(-8).toUpperCase()}</p>
                    </div>

                    {/* Customer */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Customer</p>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-indigo-600" />
                        <p className="font-semibold text-gray-800">{order.shippingAddress?.fullName || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-indigo-600" />
                        <p className="text-sm text-gray-700">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                      <p className="text-xl font-black text-indigo-600">₹{order.totalAmount}</p>
                    </div>

                    {/* Status Update */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className={`w-full px-3 py-2 rounded-lg font-bold text-sm border-2 cursor-pointer transition-all ${getStatusColor(order.status)} ${
                          updating === order._id ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
                      >
                        <Eye size={18} />
                        View
                      </button>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={16} className="text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        {order.items?.length || 0} item(s)
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {order.items?.slice(0, 4).map((item, index) => (
                        <img
                          key={index}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      ))}
                      {order.items?.length > 4 && (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">+{order.items.length - 4}</span>
                        </div>
                      )}
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

export default ManageOrders;
