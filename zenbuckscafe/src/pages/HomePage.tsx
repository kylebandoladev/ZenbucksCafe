// pages/HomePage.tsx
import HeroSection from "../sections/HeroSection";
import ShowcaseSection from "../sections/ShowcaseSection";
import DirectionSection from "../sections/DirectionSection";
import FooterSection from "../sections/FooterSection";
import Navbar from "../../components/Navbar";
import About from "./About";
import MenuShowcase from "../sections/MenuShowcase";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <ShowcaseSection />
      <MenuShowcase />
      <DirectionSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
