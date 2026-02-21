import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../services/orderApi';
import { RefreshCw, Calendar, AlertCircle, CheckCircle, Package } from 'lucide-react';

const AlterationRequest = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orderId: '',
    issue: '',
    chest: '',
    shoulder: '',
    waist: '',
    length: '',
    pickupDate: '',
    pickupTime: 'Morning (9AM-12PM)',
    specialInstructions: ''
  });

  const timeSlots = ['Morning (9AM-12PM)', 'Afternoon (12PM-3PM)', 'Evening (3PM-6PM)'];
  const commonIssues = [
    'Too Tight',
    'Too Loose',
    'Length Issue',
    'Sleeve Problem',
    'Button Issue',
    'Stitching Problem',
    'Other'
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      // Filter delivered orders only
      const deliveredOrders = data.filter(order => order.status === 'Delivered');
      setOrders(deliveredOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      alert('✅ Alteration request submitted! Our delivery partner will reach you within 30 minutes for pickup.');
      navigate('/my-orders');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4 animate-pulse">
            <RefreshCw size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-800 mb-3">Free Alteration Service</h1>
          <p className="text-xl text-gray-600">Not satisfied with the fit? We'll fix it for FREE!</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">
            <Package size={80} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Delivered Orders</h3>
            <p className="text-gray-600 mb-6">You need to have delivered orders to request alterations.</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Select Order */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Package className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Select Order</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {orders.map((order) => (
                  <label
                    key={order._id}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                      formData.orderId === order._id
                        ? 'border-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="orderId"
                      value={order._id}
                      checked={formData.orderId === order._id}
                      onChange={handleChange}
                      required
                      className="hidden"
                    />
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-800">Order #{order._id?.slice(-8).toUpperCase()}</p>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        Delivered
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.items?.length || 0} item(s)</p>
                    <p className="text-lg font-bold text-indigo-600 mt-2">₹{order.totalAmount}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Issue Description */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-orange-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">What's the Issue?</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {commonIssues.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => setFormData({ ...formData, issue })}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      formData.issue === issue
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>

              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                placeholder="Describe the issue in detail..."
              />
            </div>

            {/* Re-Measurements (Optional) */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">New Measurements (Optional)</h2>
              <p className="text-gray-600 mb-6">Provide new measurements if needed</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Chest (inches)</label>
                  <input
                    type="number"
                    name="chest"
                    value={formData.chest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="38"
                  />
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Shoulder (inches)</label>
                  <input
                    type="number"
                    name="shoulder"
                    value={formData.shoulder}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="16"
                  />
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Waist (inches)</label>
                  <input
                    type="number"
                    name="waist"
                    value={formData.waist}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="32"
                  />
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Length (inches)</label>
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="28"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Pickup Schedule</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
                  <label className="block text-lg font-bold text-gray-800 mb-3">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg font-semibold"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <label className="block text-lg font-bold text-gray-800 mb-3">Time Slot</label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg font-semibold"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                <p className="text-center text-lg font-bold text-green-700">
                  ✨ FREE Alteration Service - No Extra Charges!
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-2xl hover:shadow-3xl disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : (
                <>
                  <CheckCircle size={28} />
                  Request Free Alteration
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AlterationRequest;
