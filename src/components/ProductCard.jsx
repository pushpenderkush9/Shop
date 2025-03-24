import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 block text-center mt-2">
        View Product
      </Link>
    </div>
  );
};

export default ProductCard;
