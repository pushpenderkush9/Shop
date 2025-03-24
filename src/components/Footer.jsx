import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="mt-3 text-gray-400">
            Discover the best trends in fashion, accessories, and more at our eCommerce store.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="/shipping" className="hover:text-white">Shipping & Delivery</a></li>
            <li><a href="/returns" className="hover:text-white">Returns & Refunds</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter & Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <div className="flex justify-center sm:justify-start space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
          </div>
          <p className="mt-4 text-gray-400">Subscribe to our newsletter</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 p-2 w-full rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />
          <button className="mt-2 w-full p-2 bg-blue-600 rounded text-white hover:bg-blue-500">
            Subscribe
          </button>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} YourShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
