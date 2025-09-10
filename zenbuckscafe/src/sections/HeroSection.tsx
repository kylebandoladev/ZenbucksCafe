import { useGSAP } from "@gsap/react";
import heroVideo from "/video/hero-video.mp4";
import gsap from "gsap";

const HeroSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to("#text", {
      ease: "power1.inOut",
      opacity: 1,
      y: 0,
    });
    tl.fromTo(
      ".para",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,

        stagger: 0.1,
        ease: "power1.inOut",
      }
    );
  });

  return (
    <section className="relative w-full h-screen pt-20 noisy">
      <div className="absolute inset-0 w-full h-full">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex font-medium flex-col items-center justify-center text-center text-white px-4 z-10 backdrop-blur-xs">
        <h1
          id="text"
          className="text-4xl md:text-6xl font-bold mb-4 opacity-0 translate-y-10"
        >
          Welcome
        </h1>
        <p className="text-lg md:text-2xl mb-6 para opacity-0 translate-y-10">
          We serve the richest coffee in the neighbourhood.
        </p>
        <p className="text-base md:text-lg max-w-2xl mb-3 para opacity-0 translate-y-10">
          Japanese-inspired interior and facade design perfect for coffee
          lovers.
        </p>
        <button className="para px-5 py-3 bg-amber-500 text-xl font-bold rounded-4xl hover:bg-amber-600 transition-colors duration-400 opacity-0 translate-y-10">
          <a href="#menu">Explore Menu</a>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
