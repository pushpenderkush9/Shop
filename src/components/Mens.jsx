import { useNavigate } from "react-router-dom";

const Mens = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Upper Wear", image: "/Featured/21.jpeg", link: "/men-top" },
    { name: "Lower Wear", image: "/Featured/24.jpeg", link: "/men-lower" },
    { name: "Accessories", image: "9.jpeg", link: "/men-accessories" },
    { name: "Footwear", image: "Inspiration.jpeg", link: "/men-footwear" },
  ];

  return (
    <div className="grid  mt-50 mb-50 grid-cols-2 md:grid-cols-4 gap-4 p-6 max-w-screen-lg mx-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative group cursor-pointer h-48 md:h-64 rounded-lg overflow-hidden"
          onClick={() => navigate(category.link)}
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0  bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>

          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-3xl font-bold">{category.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mens;
