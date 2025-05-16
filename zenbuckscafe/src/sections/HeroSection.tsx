import Hero from "../../components/assets/Hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen pt-20">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={Hero}
          alt="Coffee shop interior"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex font-medium flex-col items-center justify-center text-center text-white px-4 z-10 backdrop-blur-xs">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome!</h1>
        <p className="text-xl md:text-3xl mb-6">
          We serve the richest coffee in the city
        </p>
        <p className="text-base md:text-lg max-w-2xl mb-3">
          Japanese-inspired interior and facade design perfect for coffee
          lovers.
        </p>
        <button className=" px-5 py-3 bg-amber-500 text-xl font-bold rounded-4xl">
          Order Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
