import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "./FeaturedProducts";
import RelatedProducts from "../components/RelatedProducts";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false); 

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  // Function to handle adding a product to the cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); // Notify navbar/cart

    setAdded(true); 
    setTimeout(() => setAdded(false), 1500); // Reset after 1.5 sec
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.name} className="w-150 h-150 rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description || "No description available."}</p>
          <p className="text-lg font-semibold mt-4">${product.price}</p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)} // Pass product here
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded"
          >
            Add to Cart
          </button>

          {/* Feedback Message */}
          {added && <p className="text-green-600 mt-2">Added to Cart!</p>}
        </div>
      </div>
      {/* <RelatedProducts currentProductId={product.id} /> */}
    </div>
  );
};

export default ProductPage;
