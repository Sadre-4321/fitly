import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, X } from 'lucide-react';

const MyOrders = () => {
  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2024-01-15',
      items: [{ name: 'Blue Denim Shirt', qty: 2, price: 1299 }],
      total: 2598,
      status: 'Delivered',
      trackingId: 'TRK123456'
    },
    {
      id: 'ORD002',
      date: '2024-01-20',
      items: [{ name: 'Custom Stitching - Shirt', qty: 1, price: 310 }],
      total: 310,
      status: 'Processing',
      trackingId: 'TRK789012'
    }
  ]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="text-green-500" />;
      case 'Processing': return <Clock className="text-yellow-500" />;
      case 'Shipped': return <Truck className="text-blue-500" />;
      case 'Cancelled': return <X className="text-red-500" />;
      default: return <Package className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                    <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">{order.status}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2">
                      <span>{item.name} x {item.qty}</span>
                      <span className="font-semibold">₹{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Tracking ID: {order.trackingId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-indigo-600">₹{order.total}</p>
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
