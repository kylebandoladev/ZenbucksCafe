import { coffeeCarousel } from "../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSellerSection = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <section className="bg-[#F1DEC9] h-screen py-8 w-screen text-amber-950">
      <h1 className="text-center text-4xl mt-5  font-bold ">Best Sellers</h1>
      <div className="m-auto w-11/12">
        <div className="mt-10 gap-10">
          <Slider {...settings}>
            {coffeeCarousel.map((d) => (
              <div
                key={d.name}
                className="bg-[#FFDBB5] h-[400px] text-[#543310] rounded-xl"
              >
                <div className="rounded-t-xl h-56 flex justify-center items-center">
                  <img
                    src={d.imgPath}
                    alt={d.name}
                    className="h-50 w-44 rounded-xl"
                  />
                </div>
                <div className="flex flex-col  justify-center gap-4 p-4">
                  <h2 className="text-2xl font-bold">{d.name}</h2>
                  <p className="">{d.description}</p>
                  <div className=" flex justify-between">
                    <p className="text-2xl font-bold">{`₱${d.price}`}</p>
                    <button className="text-lg px-6 py-1 bg-[#543310] border-none rounded-lg text-white">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
