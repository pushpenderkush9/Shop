import Carousel from "./Carousel";
import Choice from "./Choice";
import FeaturedProducts from './FeaturedProducts'
import ProductPage from "./ProductPage";
import ProductSlider from "./ProductSlider";
const Home = () => {
  return (
    <div>
    
      <Carousel />
      <Choice />

      <ProductSlider />
     <FeaturedProducts />
     
    </div>
  );
};

export default Home;
