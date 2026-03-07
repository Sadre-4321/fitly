import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logoutUser } from '../pages/services/authApi';
import { User, LogOut, ShoppingBag, UserCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    updateCartCount();
    checkAuthStatus();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  };

  const checkAuthStatus = () => {
    setIsLoggedIn(isAuthenticated());
    setUserRole(getUserRole());
    
    // Get user name from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Try to get from profile API or localStorage
      const storedName = localStorage.getItem('userName');
      setUserName(storedName || 'User');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/login');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 p-2.5 rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-xl">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" fill="currentColor" fillOpacity="0.2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="8" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent leading-none">Fitly</span>
              <span className="text-[8px] font-semibold text-gray-500 tracking-wider">PREMIUM TAILORS</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all">Home</Link>
            <Link to="/shop" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all">Shop</Link>
            <Link to="/stitching-request" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all">Custom Stitch</Link>
            <Link to="/about" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all">Story</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-all"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-all group">
              <svg className="w-6 h-6 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* User Profile - Always Visible */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 hover:bg-gray-50 rounded-lg transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                    {/* Profile image will go here - for now showing icon */}
                    <User size={18} className="text-white" />
                  </div>
                  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <span className="text-[11px] font-normal text-gray-600 max-w-[80px] truncate">
                  {isLoggedIn ? userName : 'Login'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-100 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">Welcome back!</p>
                      </div>
                      <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <UserCircle size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </Link>
                      <Link to="/my-orders" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <ShoppingBag size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">Orders</span>
                      </Link>
                      <Link to="/wishlist" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">Wishlist</span>
                      </Link>
                      <Link to="/rewards" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">Rewards</span>
                      </Link>
                      <Link to="/gift-cards" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span className="text-sm text-gray-700">Gift Cards</span>
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button onClick={() => { setShowProfileMenu(false); handleLogout(); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left">
                        <LogOut size={18} className="text-red-600" />
                        <span className="text-sm text-red-600 font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                        <p className="text-sm text-gray-700">New customer? <Link to="/register" onClick={() => setShowProfileMenu(false)} className="text-blue-600 font-semibold hover:underline">Sign Up</Link></p>
                      </div>
                      <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <UserCircle size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </Link>
                      <Link to="/my-orders" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <ShoppingBag size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">Orders</span>
                      </Link>
                      <Link to="/wishlist" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">Wishlist</span>
                      </Link>
                      <Link to="/rewards" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700">Rewards</span>
                      </Link>
                      <Link to="/gift-cards" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors">
                        <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span className="text-sm text-gray-700">Gift Cards</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all rounded-lg">Home</Link>
              <Link to="/shop" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all rounded-lg">Shop</Link>
              <Link to="/stitching-request" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all rounded-lg">Custom Stitch</Link>
              <Link to="/about" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all rounded-lg">Story</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
