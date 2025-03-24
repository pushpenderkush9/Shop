import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Function to update quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Your cart is empty. <Link to="/" className="text-blue-500">Shop now</Link>
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <p className="flex-1 ml-4">{item.name}</p>
            <div className="flex items-center">
              <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-300 rounded">-</button>
              <span className="mx-2">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-300 rounded">+</button>
            </div>
            <p className="w-20 text-center">${item.price * item.quantity}</p>
            <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
          </div> 
        ))}
        <div className="flex justify-between mt-6">
          <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
          <button className="bg-green-500 text-white px-6 py-2 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
