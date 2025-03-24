import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import Add from "./components/Add";

import Stock from "./components/Stock";
import "./App.css";
import Navbar from "./components/Navbar";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ Add this state

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/add" element={isAuthenticated ? <Add />: <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/stock" element={isAuthenticated ? <Stock />: <Login setIsAuthenticated={setIsAuthenticated} />} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
