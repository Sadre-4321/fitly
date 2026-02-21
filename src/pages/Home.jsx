import React from 'react';
import { Scissors, Sparkles, Shield, Truck, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Scissors, title: 'Custom Stitching', desc: 'Tailored to perfection', color: 'from-blue-500 to-cyan-500' },
    { icon: Sparkles, title: 'Premium Quality', desc: '35 years of excellence', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, title: 'Free Alteration', desc: 'Perfect fit guaranteed', color: 'from-green-500 to-emerald-500' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Pickup in 30 minutes', color: 'from-orange-500 to-red-500' }
  ];

  const collection = [
    { id: 1, name: "Premium Shirt & Pant Set", price: "$89.99", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBoBKAQPqMrFxZ5UOW1dEzTcMUVypB82F_g&s", rating: 4.8 },
    { id: 2, name: "Classic Coat & Pant Suit", price: "$199.99", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=500", rating: 4.9 },
    { id: 3, name: "Casual Linen Shirt", price: "$49.99", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500", rating: 4.7 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" 
            alt="Fashion Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/85 to-pink-900/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
            Fitly
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            Where Perfect Fit Meets Premium Style
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Experience 35 years of tailoring excellence. Custom stitching & ready-made fashion, delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/stitching-request')}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-2xl hover:scale-105"
            >
              Custom Stitch
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center text-gray-800 mb-16">Why Choose Fitly?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className={`inline-block p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-4`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold mb-2">1. Order Online</h3>
              <p className="text-white/80">Browse & select from our collection or request custom stitching</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <div className="text-6xl mb-4">✂️</div>
              <h3 className="text-2xl font-bold mb-2">2. We Craft</h3>
              <p className="text-white/80">Our expert tailors create your perfect garment with precision</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold mb-2">3. Fast Delivery</h3>
              <p className="text-white/80">Get it delivered or pickup from our shop in 30 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-black text-gray-800">Featured Collection</h2>
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all"
            >
              View All <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collection.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-sm">{item.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-2xl font-black text-indigo-600 mb-4">{item.price}</p>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">Ready to Get Your Perfect Fit?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of satisfied customers who trust Fitly</p>
          <button
            onClick={() => navigate('/stitching-request')}
            className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-2xl hover:scale-105"
          >
            Start Custom Stitching
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
