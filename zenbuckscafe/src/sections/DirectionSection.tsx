const DirectionSection = () => {
  return (
    <section className="bg-[#74512D] text-white py-12  items-center">
      <div className="w-full flex flex-col mx-6">
        <h2 className="text-3xl font-bold mb-4 text-amber-200 text-center">
          Find Us
        </h2>

        <div className="flex items-center justify-center gap-10">
          <div className="bg-[#F1DEC9] text-amber-950 rounded-lg shadow-md p-6 w-full max-w-md mb-6">
            <h3 className="text-xl font-semibold mb-2">Our Address</h3>
            <p>
              Casimiro a. Ynares sr. blvd, East bank road, Exodus, Mercury str.
              Blk. 4, Brgy. Sta Ana, Taytay, Philippines
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Opening Hours</h3>
            <p>Monday - Sunday: 5:00 PM - 12:00 PM</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Our Number</h3>
            <div className="flex">
              <p>09555335909</p>
            </div>
          </div>

          <p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482.7258207491746!2d121.11811941412999!3d14.55305152112778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c742aac42f23%3A0xc57d80d32bc5a1e5!2sZENBUCKS%20CAFE!5e0!3m2!1sen!2sph!4v1751357231338!5m2!1sen!2sph"
              width="800"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DirectionSection;
