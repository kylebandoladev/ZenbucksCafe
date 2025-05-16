import Carousel from "../../components/Carousel";

const BestSellerSection = () => {
  // Settings for the slider

  return (
    <section className="bg-[#F1DEC9] h-auto py-8 w-screen text-amber-950">
      <div className="">
        <div className="m-auto w-11/12">
          <div className="mt-10 gap-10">
            <Carousel title="Our Special Coffee" />
          </div>
        </div>
      </div>
      <div className="pt-8">
        <div className="m-auto w-11/12">
          <div className="mt-10 gap-10">
            <Carousel title="Our Special Desserts" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
