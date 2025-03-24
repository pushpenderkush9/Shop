import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  User, ChevronDown } from "lucide-react";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

 
  const handleLogout = () => {
    
    localStorage.removeItem("auth");
    setShowDropdown(false);
    navigate("/login"); 
  };
   

   

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">🛍️ ShopEase</Link>
          </div>

     
         
           
             

                  <div className="relative">
               

             
                
                   
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={handleLogout}>
                      Logout
                    </button>
                 
              </div>
            
          </div>

        
        </div>
     
    </nav>
  );
};

export default Navbar;
