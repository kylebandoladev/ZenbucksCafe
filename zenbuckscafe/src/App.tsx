import HeroSection from "./sections/HeroSection";
import Navbar from "../components/Navbar";
import ShowcaseSection from "./sections/ShowcaseSection";
import BestSellerSection from "./sections/BestSellerSection";
import DirectionSection from "./sections/DirectionSection";
import FooterSection from "./sections/FooterSection";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ShowcaseSection />
      <BestSellerSection />
      <DirectionSection />
      <FooterSection />
    </>
  );
};

export default App;
