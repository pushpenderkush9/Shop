import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed! Email may already be in use.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        <form className="mt-6" onSubmit={handleRegister}>
          <input type="text" className="w-full px-4 py-2 mt-2 border rounded-lg" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" className="w-full px-4 py-2 mt-2 border rounded-lg" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="w-full px-4 py-2 mt-2 border rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg">Register</button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
