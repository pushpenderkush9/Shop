import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-lg mx-auto mt-6 px-4">
      {/* Left Side - Carousel */}
      <div className="w-full md:w-1/2 p-2 md:p-4">
        <Slider {...settings}>
          <div>
            <img
              src="4.jpg"
              alt="Slide 1"
              className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="5.jpg"
              alt="Slide 2"
              className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <img
              src="7.jpg"
              alt="Slide 3"
              className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        </Slider>
      </div>

      {/* Right Side - Text Section */}
      <div className="w-full md:w-1/2 p-4 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Discover Your Style
        </h2>
        <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
          Shop the latest trends in fashion, accessories, and lifestyle products.
        </p>
        <Link to="/shop">
          <button className="mt-4 sm:mt-5 px-5 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
