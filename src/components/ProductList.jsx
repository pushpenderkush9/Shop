import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const category = location.pathname.replace("/", ""); // Extract category from URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{category.replace("-", " ")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-500">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
