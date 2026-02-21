import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded">
                <Scissors size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-black">Fitly</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              You Like Tailor - Serving Bettiah since 1989. 35+ years of excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-gray-400 text-xs hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 text-xs hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/stitching-request" className="text-gray-400 text-xs hover:text-white transition-colors">Custom Stitching</Link></li>
              <li><Link to="/about" className="text-gray-400 text-xs hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold mb-3">Customer Service</h4>
            <ul className="space-y-1.5">
              <li><Link to="/profile" className="text-gray-400 text-xs hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/wishlist" className="text-gray-400 text-xs hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/my-orders" className="text-gray-400 text-xs hover:text-white transition-colors">My Orders</Link></li>
              <li><Link to="/contact" className="text-gray-400 text-xs hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold mb-3">Contact</h4>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-xs">Bettiah, Bihar - 845438</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-indigo-400 flex-shrink-0" />
                <a href="tel:+919955404332" className="text-gray-400 text-xs hover:text-white transition-colors">+91 9955404332</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-indigo-400 flex-shrink-0" />
                <a href="mailto:info@fitly.com" className="text-gray-400 text-xs hover:text-white transition-colors">info@fitly.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-400 text-xs text-center md:text-left">
              © 2026 Fitly - You Like Tailor | Founded by Md Imam
            </p>
            <div className="flex gap-3 text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
