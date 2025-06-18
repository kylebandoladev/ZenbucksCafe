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
            className="bg-[#FFDBB5] h-[400px] text-[#543310] pt-3 pb-3 rounded-xl mx- flex flex-col"
          >
            {/* Image container with fixed height */}
            <div className="flex justify-center items-center h-[200px] ">
              <img
                src={d.imgPath}
                alt={d.name}
                className="h-full w-full object-contain rounded-xl"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                }}
              />
            </div>

            {/* Content container with flex-grow to push button to bottom */}
            <div className="flex flex-col justify-between flex-grow p-4 gap-3">
              <div>
                <h2 className="text-2xl font-bold text-center">{d.name}</h2>
                <p className="text-center mt-2 min-h-[60px] flex items-center justify-center">
                  {d.description}
                </p>
              </div>

              {/* Price and button container */}
              <div className="flex justify-between items-center mt-auto">
                <p className="text-2xl font-bold">{`₱${d.price}`}</p>
                <button className="text-lg font-bold px-6 py-2 bg-[#543310] border-none rounded-lg text-white hover:bg-[#3a240b] transition-colors">
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
