import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { coffeeCarousel } from "../src/constants";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <Slider {...settings}>
      {coffeeCarousel.map((d) => (
        <div
          key={d.name}
          className="bg-[#FFDBB5] h-[400px] text-[#543310] pt-3 pb-3 rounded-xl"
        >
          <div className=" flex justify-center items-center">
            <img
              src={d.imgPath}
              alt={d.name}
              className="h-55 w-50 rounded-xl"
            />
          </div>
          <div className="flex flex-col  justify-center gap-4 p-4">
            <h2 className="text-2xl font-bold">{d.name}</h2>
            <p className="">{d.description}</p>
            <div className=" flex justify-between">
              <p className="text-2xl font-bold">{`₱${d.price}`}</p>
              <button className="text-lg fontbold px-6 py-1 bg-[#543310] border-none rounded-lg text-white">
                Order Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
