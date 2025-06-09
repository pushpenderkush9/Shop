import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ChevronDown, ShoppingCart } from "lucide-react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Initialize with 0

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount); // Listen for storage changes

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">🛍️ ShopEase</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/shop" className="hover:text-gray-300">Shop</Link>
           
           
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>

          {/* Cart & Profile */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="hover:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <User size={20} /> Account <ChevronDown size={18} />
                </button>

                {/* Profile Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 shadow-lg rounded-lg">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setShowDropdown(false)}>Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setShowDropdown(false)}>Orders</Link>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => { setIsAuthenticated(false); setShowDropdown(false); }}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
