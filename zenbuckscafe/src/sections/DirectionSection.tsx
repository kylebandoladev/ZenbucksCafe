const DirectionSection = () => {
  return (
    <section className="bg-[#74512D] text-white py-12  items-center">
      <div className="w-full flex flex-col mx-6">
        <h2 className="text-3xl font-bold mb-4 text-amber-200">Find Us</h2>

        <div className="bg-[#F1DEC9] text-amber-950 rounded-lg shadow-md p-6 w-full max-w-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Our Address</h3>
          <p>
            Casimiro a. Ynares sr. blvd, East bank road, Exodus, Mercury str.
            Blk. 4, Brgy. Sta Ana, Taytay, Philippines
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Opening Hours</h3>
          <p>Monday - Sunday: 3:00 PM - 12:00 PM</p>
        </div>
      </div>
    </section>
  );
};

export default DirectionSection;
