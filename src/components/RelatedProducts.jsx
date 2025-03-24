import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RelatedProducts = ({ currentProductId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      // const response = await axios.get(`http://localhost:5000/api/products/related/${currentProductId}`);
      setRelated(response.data);
    };
    fetchRelated();
  }, [currentProductId]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="block border p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <p className="mt-2">{product.name}</p>
            <p className="font-semibold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
