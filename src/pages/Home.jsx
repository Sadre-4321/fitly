import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Sparkles, Truck, Shield, Home as HomeIcon, Shirt } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: "Premium Tailoring Services",
      subtitle: "Custom Stitching from ₹310",
      description: "35 Years of Excellence in Bettiah, Bihar",
      bg: "from-blue-600 to-blue-800",
      image: "https://img.businessoffashion.com/resizer/v2/YA6DP6WZIJAGBP6AIYVB3TEL7U.jpg?auth=1fbd403eaa5027005566987bca158e9d8b4e88626087c6bb6bd1d5a699af2ba3&width=800&height=533"
    },
    {
      title: "Ready-Made Collection",
      subtitle: "Shop Premium Garments",
      description: "Shirts, Pants, Suits & More",
      bg: "from-green-600 to-green-800",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
    }
  ];

  const categories = [
    { name: 'Shop', icon: Shirt, path: '/shop', color: 'bg-blue-50 text-blue-600' },
    { name: 'Custom Stitch', icon: Scissors, path: '/stitching-request', color: 'bg-green-50 text-green-600' },
    { name: 'Premium Quality', icon: Sparkles, path: '/shop', color: 'bg-purple-50 text-purple-600' },
    { name: 'Fast Delivery', icon: Truck, path: '/shop', color: 'bg-orange-50 text-orange-600' },
    { name: 'Free Alteration', icon: Shield, path: '/shop', color: 'bg-red-50 text-red-600' },
    { name: 'Our Story', icon: HomeIcon, path: '/about', color: 'bg-indigo-50 text-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Carousel */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`h-full bg-gradient-to-r ${banner.bg} flex flex-col md:flex-row items-center`}>
                  <div className="w-full md:w-1/2 px-6 md:px-12 py-6 text-white text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{banner.title}</h2>
                    <p className="text-lg md:text-2xl mb-1 md:mb-2">{banner.subtitle}</p>
                    <p className="text-sm md:text-lg mb-4 md:mb-6">{banner.description}</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="px-6 md:px-8 py-2 md:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all text-sm md:text-base"
                    >
                      Shop Now
                    </button>
                  </div>
                  <div className="hidden md:block w-full md:w-1/2">
                    <img src={banner.image} alt={banner.title} className="h-80 w-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-white mt-4">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(category.path)}
                  className="flex flex-col items-center p-4 md:p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white border border-gray-100"
                >
                  <div className={`p-3 md:p-4 rounded-full ${category.color} mb-2 md:mb-3`}>
                    <Icon size={24} className="md:w-8 md:h-8" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-gray-800 text-center">{category.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white mt-4">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Why Choose Fitly?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="inline-block p-3 md:p-4 bg-blue-100 rounded-full mb-3 md:mb-4">
                <Scissors size={24} className="text-blue-600 md:w-8 md:h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Custom Stitching</h3>
              <p className="text-xs md:text-sm text-gray-600">Tailored to perfection</p>
            </div>
            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="inline-block p-3 md:p-4 bg-green-100 rounded-full mb-3 md:mb-4">
                <Sparkles size={24} className="text-green-600 md:w-8 md:h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Premium Quality</h3>
              <p className="text-xs md:text-sm text-gray-600">35 years of excellence</p>
            </div>
            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="inline-block p-3 md:p-4 bg-amber-100 rounded-full mb-3 md:mb-4">
                <Shield size={24} className="text-amber-600 md:w-8 md:h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Free Alteration</h3>
              <p className="text-xs md:text-sm text-gray-600">Perfect fit guaranteed</p>
            </div>
            <div className="text-center p-4 md:p-6 bg-gray-50 rounded-xl">
              <div className="inline-block p-3 md:p-4 bg-red-100 rounded-full mb-3 md:mb-4">
                <Truck size={24} className="text-red-600 md:w-8 md:h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Fast Delivery</h3>
              <p className="text-xs md:text-sm text-gray-600">Pickup in 30 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Get Your Perfect Fit?</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8">Join thousands of satisfied customers in Bettiah, Bihar</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              onClick={() => navigate('/shop')}
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all text-sm md:text-base"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/stitching-request')}
              className="px-6 md:px-8 py-3 md:py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all border-2 border-white text-sm md:text-base"
            >
              Custom Stitch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
