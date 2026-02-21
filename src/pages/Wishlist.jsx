import { useState } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Blue Denim Shirt', price: 1299, image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Black Formal Pant', price: 1599, image: 'https://via.placeholder.com/200' }
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Heart className="text-red-500" size={40} />
          My Wishlist
        </h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-4">₹{item.price}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={18} />
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

export default Wishlist;
