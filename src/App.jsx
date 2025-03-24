import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import Cart from "./components/CartPage";
import Mens from "./components/Mens";
import ProductList from "./components/ProductList";
import Register from "./pages/Register";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<h1>Profile Page</h1>} />
        </Route>
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/men" element={<Mens />}/>
        <Route path="/men-top" element={<ProductList category="men-top" />} />
        <Route path="/men-lower" element={<ProductList category="men-lower" />} />
        <Route path="/men-accessories" element={<ProductList category="men-accessories" />} />
        <Route path="/men-footwear" element={<ProductList category="men-footwear" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
