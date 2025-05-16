import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { coffeeCarousel } from "../src/constants";

interface CarouselProps {
  title?: string;
}

const Carousel = ({ title = "Best Sellers" }: CarouselProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container ">
      {title && (
        <h1 className="carousel-title text-3xl text-center font-bold mb-6">
          {title}
        </h1>
      )}
      <Slider {...settings}>
        {coffeeCarousel.map((d) => (
          <div
            key={d.name}
            className="bg-[#FFDBB5] h-[400px] text-[#543310] pt-3 pb-3 rounded-xl mx-2" // Added mx-2 for horizontal gap
          >
            <div className="flex justify-center items-center h-[200px]">
              {" "}
              {/* Fixed height container */}
              <img
                src={d.imgPath}
                alt={d.name}
                className="h-full w-full object-cover rounded-xl" /* This will make images fill container while maintaining aspect ratio */
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                }} /* Fixed dimensions */
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-4">
              <h2 className="text-2xl font-bold">{d.name}</h2>
              <p className="">{d.description}</p>
              <div className="flex justify-between">
                <p className="text-2xl font-bold">{`₱${d.price}`}</p>
                <button className="text-lg fontbold px-6 py-1 bg-[#543310] border-none rounded-lg text-white">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
