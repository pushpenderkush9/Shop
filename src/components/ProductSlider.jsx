import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const products = [
  { id: 11, name: "Stylish Jacket", price: "6500", image: "./productSlider/Jacket.jpeg" },
  { id: 12, name: "Casual Shoes", price: "5700", image: "./productSlider/Shoes.jpeg" },
  { id: 13, name: "Smart Watch", price: "13000", image: "./productSlider/Smart-Watch.jpeg" },
  { id: 14, name: "Sunglasses", price: "8000", image: "./productSlider/sunglasses.jpeg" },
  { id: 15, name: "Denim Jeans", price: "3200", image: "./productSlider/Denim-Jeans.jpeg" },
  { id: 16, name: "Leather Belt", price: "150", image: "./productSlider/Leather-Belt.jpeg" },
  { id: 17, name: "Backpack", price: "5000", image: "./productSlider/Backpack.jpeg" },
  { id: 18, name: "Sports Cap", price: "700", image: "./productSlider/Sports-Cap.jpeg" },
];

const ProductSlider = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
    <h1 className="text-center md:text-6xl m-5 text-3xl font-bold">Amazing Products To Buy</h1>
    <div className="max-w-screen-lg mx-auto p-6">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-52 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-lg font-bold">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-black text-white px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
};

export default ProductSlider;
