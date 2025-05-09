const ShowcaseSection = () => {
  return (
    <section className="text-white bg-[#74512D] h-screen w-screen">
      <div className="text-center  pt-10 lg:px-100">
        <h1 className="md:text-xl  font-bold">
          Fresh and <span className="text-amber-200">Tasty Coffee</span>
        </h1>
        <p className="">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In magnam,
          doloremque autem enim vero iure, nihil soluta eligendi labore itaque
          sint molestiae, vel nobis cupiditate sed molestias cumque eum impedit?
        </p>
      </div>
      <div className="items-center flex justify-between">
        <div className="">
          <img src="/assets/coffee1.png" alt="" />
        </div>
      </div>
    </section>
  );
};
export default ShowcaseSection;
