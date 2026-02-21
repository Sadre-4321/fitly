import { Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-indigo-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Home size={20} />
            Go Home
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2"
          >
            <Search size={20} />
            Browse Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
