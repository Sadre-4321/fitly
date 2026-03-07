import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, CreditCard, Gift, Star, Bell, Heart, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import { getUserProfile, logoutUser } from './services/authApi';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male'
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const profile = await getUserProfile();
      setUserData({
        firstName: profile.name?.split(' ')[0] || '',
        lastName: profile.name?.split(' ')[1] || '',
        email: profile.email || '',
        phone: profile.phone || '',
        gender: 'male'
      });
    } catch (error) {
      console.log('Failed to fetch profile');
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              
              {/* User Card */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hello,</p>
                    <p className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</p>
                  </div>
                </div>
              </div>

              {/* MY ORDERS */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => navigate('/my-orders')}
                  className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-700">MY ORDERS</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>

              {/* ACCOUNT SETTINGS */}
              <div className="border-b border-gray-200">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <User size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-700 text-sm">ACCOUNT SETTINGS</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <button
                      onClick={() => setActiveSection('profile')}
                      className={`block w-full text-left py-2 text-sm ${
                        activeSection === 'profile' ? 'text-blue-600 font-semibold' : 'text-gray-600'
                      }`}
                    >
                      Profile Information
                    </button>
                    <button
                      onClick={() => setActiveSection('addresses')}
                      className={`block w-full text-left py-2 text-sm ${
                        activeSection === 'addresses' ? 'text-blue-600 font-semibold' : 'text-gray-600'
                      }`}
                    >
                      Manage Addresses
                    </button>
                    <button
                      onClick={() => setActiveSection('pan')}
                      className={`block w-full text-left py-2 text-sm ${
                        activeSection === 'pan' ? 'text-blue-600 font-semibold' : 'text-gray-600'
                      }`}
                    >
                      PAN Card Information
                    </button>
                  </div>
                </div>
              </div>

              {/* PAYMENTS */}
              <div className="border-b border-gray-200">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-700 text-sm">PAYMENTS</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      Gift Cards <span className="text-gray-400">₹0</span>
                    </button>
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      Saved UPI
                    </button>
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      Saved Cards
                    </button>
                  </div>
                </div>
              </div>

              {/* MY STUFF */}
              <div className="border-b border-gray-200">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Gift size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-700 text-sm">MY STUFF</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      My Coupons
                    </button>
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      My Reviews & Ratings
                    </button>
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      All Notifications
                    </button>
                    <button className="block w-full text-left py-2 text-sm text-gray-600">
                      My Wishlist
                    </button>
                  </div>
                </div>
              </div>

              {/* LOGOUT */}
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">Logout</span>
                </button>
              </div>

              {/* Frequently Visited */}
              <div className="p-4 bg-gray-50 text-xs text-gray-600">
                <p className="font-semibold mb-2">Frequently Visited:</p>
                <p className="text-blue-600 cursor-pointer hover:underline">Track Order</p>
                <p className="text-blue-600 cursor-pointer hover:underline">Help Center</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              
              {activeSection === 'profile' && (
                <>
                  {/* Personal Information */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                      <button className="text-blue-600 font-semibold text-sm hover:underline">
                        Edit
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <input
                          type="text"
                          value={userData.firstName}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={userData.lastName}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Your Gender</p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="gender" checked={userData.gender === 'male'} readOnly className="w-4 h-4" />
                          <span className="text-sm text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="gender" checked={userData.gender === 'female'} readOnly className="w-4 h-4" />
                          <span className="text-sm text-gray-700">Female</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
                      <button className="text-blue-600 font-semibold text-sm hover:underline">
                        Edit
                      </button>
                    </div>
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Mobile Number</h3>
                      <button className="text-blue-600 font-semibold text-sm hover:underline">
                        Edit
                      </button>
                    </div>
                    <input
                      type="tel"
                      value={userData.phone}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  {/* FAQs */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQs</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-2">What happens when I update my email address?</p>
                        <p className="text-sm text-gray-600">Your login email will be updated. You'll use the new email for future logins.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-2">When will my account be updated?</p>
                        <p className="text-sm text-gray-600">Changes are reflected immediately after saving.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 mb-2">What happens to existing account?</p>
                        <p className="text-sm text-gray-600">Your order history and saved addresses remain unchanged.</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button className="text-blue-600 font-semibold text-sm hover:underline">
                      Deactivate Account
                    </button>
                    <button className="text-red-600 font-semibold text-sm hover:underline">
                      Delete Account
                    </button>
                  </div>
                </>
              )}

              {activeSection === 'addresses' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Addresses</h2>
                  <p className="text-gray-600">No saved addresses yet. Add your delivery address.</p>
                  <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    + Add New Address
                  </button>
                </div>
              )}

              {activeSection === 'pan' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">PAN Card Information</h2>
                  <p className="text-gray-600">Add your PAN card details for seamless transactions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
