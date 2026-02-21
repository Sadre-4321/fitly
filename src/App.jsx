import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SplashScreen from './Components/SplashScreen'
import Home from './pages/Home'
import ProductList from './pages/Shop/productList'
import ProductDetails from './pages/Shop/ProductDetails'
import Cart from './pages/Shop/Cart'
import Checkout from './pages/Shop/Checkout'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/Orders/OrderDetails'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Contact from './pages/Contact'
import Search from './pages/Search'
import OrderSuccess from './pages/OrderSuccess'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ManageOrders from './pages/Admin/ManageOrders'
import ManageProducts from './pages/Admin/ManageProducts'
import DeliveryDashboard from './pages/Delivery/DeliveryDashboard'
import PickupOrders from './pages/Delivery/PickupOrders'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import StitchingRequest from './pages/Stitching/StitchingRequest'
import AlterationRequest from './pages/Stitching/AlterationRequest'
import About from './pages/About'

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowSplash(false);
      }, 700);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen isExiting={isExiting} />;
  }

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/my-orders" element={<MyOrders/>} />
        <Route path="/orders/:id" element={<OrderDetails/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/order-success" element={<OrderSuccess/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/orders" element={<ManageOrders/>} />
        <Route path="/admin/products" element={<ManageProducts/>} />
        <Route path="/delivery" element={<DeliveryDashboard/>} />
        <Route path="/delivery/pickup" element={<PickupOrders/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/stitching-request" element={<StitchingRequest/>} />
        <Route path="/alteration-request" element={<AlterationRequest/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App