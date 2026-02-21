import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/orderApi';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      setError('Order not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderTimeline = () => {
    const status = order?.status?.toLowerCase() || 'pending';
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: CheckCircle },
      { key: 'processing', label: 'Processing', icon: Clock },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: Package }
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
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

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <XCircle size={80} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/my-orders')}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const timeline = getOrderTimeline();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/my-orders')}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Orders</span>
          </button>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Order Details</h1>
              <p className="text-white/90">Order ID: #{order._id?.slice(-8).toUpperCase()}</p>
            </div>
            <div className={`px-6 py-3 rounded-full font-bold text-lg border-2 ${getStatusColor(order.status)}`}>
              {order.status || 'Pending'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Order Tracking Timeline */}
        {order.status?.toLowerCase() !== 'cancelled' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Order Tracking</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
                  style={{ width: `${(timeline.filter(s => s.completed).length - 1) * 33.33}%` }}
                />
              </div>
              
              {/* Timeline Steps */}
              <div className="relative grid grid-cols-4 gap-4">
                {timeline.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${
                        step.completed 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <p className={`text-sm font-semibold text-center ${
                        step.completed ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      {step.active && (
                        <p className="text-xs text-indigo-600 mt-1 font-medium">Current Status</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Package className="text-indigo-600" size={28} />
                Ordered Items ({order.items?.length || 0})
              </h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-2">{item.name}</h3>
                      <div className="flex gap-3 text-sm mb-2">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                          Size: {item.size}
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <p className="text-2xl font-black text-indigo-600">₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                      <p className="text-2xl font-black text-gray-800">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MapPin className="text-indigo-600" size={28} />
                Shipping Address
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <p className="font-bold text-gray-800 text-lg mb-2">{order.shippingAddress?.fullName}</p>
                <p className="text-gray-700 leading-relaxed">
                  {order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                  PIN: {order.shippingAddress?.pincode}
                </p>
                <div className="mt-4 pt-4 border-t border-indigo-200">
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span> {order.shippingAddress?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Date */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <Calendar className="text-indigo-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="text-purple-600" size={24} />
                  <h3 className="font-bold text-gray-800">Payment Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span className="font-bold text-gray-800">{order.paymentMethod || 'COD'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 pt-6 border-t-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax & Fees</span>
                  <span className="font-semibold">₹0</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2">
                  <span className="text-xl font-bold text-gray-800">Total Amount</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-700 text-center">
                  Need help with your order?<br />
                  <span className="font-bold text-indigo-600">Contact Support</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
