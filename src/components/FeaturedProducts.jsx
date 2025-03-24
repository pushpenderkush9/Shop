import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const products = [
  { id: 1, name: "Stylish Jacket", price: "12000", image: "/Featured/jacket.jpeg" },
  { id: 2, name: "Casual Shoes", price: "1500", image: "/Featured/Casual Shoes.jpeg" },
  { id: 3, name: "Smart Watch", price: "21000", image: "/Featured/watch.jpeg" },
  { id: 4, name: "Sunglasses", price: "7000", image: "/Featured/sunglasses.jpeg" },
  { id: 5, name: "Denim Jeans", price: "3200", image: "/Featured/24.jpeg" },
  { id: 6, name: "Leather Belt", price: "150", image: "/Featured/23.jpeg" },
  { id: 7, name: "Backpack", price: "5000", image: "/Featured/22.jpeg" },
  { id: 8, name: "Sports Cap", price: "700", image: "/Featured/20.jpeg" },

];

const FeaturedProducts = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const addToCart = (product) => {
    setCart([...cart, product]);  
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
    <h1 className="text-center font-bold md:text-6xl m-5 text-3xl">Featured Products</h1>
    <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-screen-lg mx-auto">
      {products.map((product) => (
        <div key={product.id}
        onClick={() => navigate(`/product/${product.id}`)}
         className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover"
          />

          {/* Product Info */}
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-lg font-bold">₹{product.price}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default FeaturedProducts;
