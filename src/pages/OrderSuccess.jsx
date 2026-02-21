import { CheckCircle, Package, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="mb-8">
          <div className="inline-block p-6 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle size={80} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-bold text-gray-800">ORD123456</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-bold text-indigo-600 text-xl">₹2,598</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-bold text-gray-800">Cash on Delivery</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Date</p>
              <p className="font-bold text-gray-800">5-7 Business Days</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/my-orders')}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Package size={20} />
            Track Order
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
