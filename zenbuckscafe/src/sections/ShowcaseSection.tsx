import { coffeeShowcase } from "../constants";

const ShowcaseSection = () => {
  return (
    <section className="text-white bg-[#74512D] py-8 w-screen">
      <div className="text-center  lg:px-100">
        <h1 className="md:text-xl  font-bold">
          Fresh and <span className="text-amber-200">Tasty Coffee</span>
        </h1>
        <p className="">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In magnam,
          doloremque autem enim vero iure, nihil soluta eligendi labore itaque
          sint molestiae, vel nobis cupiditate sed molestias cumque eum impedit?
        </p>
      </div>
      <div className="items-center flex justify-between mt-5">
        {coffeeShowcase.map(({ name, imgPath, description }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center text-center w-1/3 h-1/2 p-4"
          >
            <img
              src={imgPath}
              alt={name}
              className="w-48 h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{name}</h2>
            <p className="text-sm text-gray-300 lg:px-20">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ShowcaseSection;
