import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logoutUser } from '../pages/services/authApi';
import { User, LogOut, ShoppingBag, UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.name || 'User');
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
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                {isLoggedIn && (
                  <span className="text-sm font-semibold text-gray-700 hidden lg:block">{userName}</span>
                )}
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors">
                        <UserCircle size={20} className="text-indigo-600" />
                        <span className="text-gray-700 font-medium">Edit Profile</span>
                      </Link>
                      <Link to="/my-orders" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors">
                        <ShoppingBag size={20} className="text-indigo-600" />
                        <span className="text-gray-700 font-medium">My Orders</span>
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <Link to="/register" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors">
                        <User size={20} className="text-green-600" />
                        <span className="text-gray-700 font-medium">Create Another Account</span>
                      </Link>
                      <button onClick={() => { setShowProfileMenu(false); handleLogout(); }} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left">
                        <LogOut size={20} className="text-red-600" />
                        <span className="text-red-600 font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors">
                        <User size={20} className="text-indigo-600" />
                        <span className="text-gray-700 font-medium">Login</span>
                      </Link>
                      <Link to="/register" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors">
                        <UserCircle size={20} className="text-indigo-600" />
                        <span className="text-gray-700 font-medium">Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
