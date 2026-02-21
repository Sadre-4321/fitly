import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Users, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Manage Products',
      description: 'Add, edit, and delete products',
      icon: Package,
      path: '/admin/products',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Manage Orders',
      description: 'View and update order status',
      icon: ShoppingCart,
      path: '/admin/orders',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Customers',
      description: 'View customer information',
      icon: Users,
      path: '/admin/customers',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Analytics',
      description: 'View sales and statistics',
      icon: BarChart3,
      path: '/admin/analytics',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-black text-white mb-4">Admin Dashboard</h1>
          <p className="text-xl text-white/90">Manage your tailor shop</p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.path}
                onClick={() => navigate(card.path)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                  <Icon size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/90">{card.description}</p>
                </div>
                <div className="p-6">
                  <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                    Open →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
