import HeroSection from "./sections/HeroSection";
import Navbar from "../components/Navbar";
import ShowcaseSection from "./sections/ShowcaseSection";
import BestSellerSection from "./sections/BestSellerSection";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ShowcaseSection />
      <BestSellerSection />
    </>
  );
};

export default App;
