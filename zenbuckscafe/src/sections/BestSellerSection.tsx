import Carousel from "../../components/Carousel";

const BestSellerSection = () => {
  // Settings for the slider

  return (
    <section className="bg-[#F1DEC9] h-auto py-8 w-screen text-amber-950">
      <div>
        <h1 className="text-center text-4xl mt-5  font-bold ">
          Coffee Best Sellers
        </h1>
        <div className="m-auto w-11/12">
          <div className="mt-10 gap-10">
            <Carousel />
          </div>
        </div>
      </div>
      <div className="my-20">
        <h1 className="text-center text-4xl mt-5  font-bold ">Best Sellers</h1>
        <div className="m-auto w-11/12">
          <div className="mt-10 gap-10">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
