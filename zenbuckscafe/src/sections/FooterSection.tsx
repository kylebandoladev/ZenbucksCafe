import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-10 px-10">
      <div className="flex justify-between container  text-white">
        <h2 className="text-2xl font-semibold">Zenbucks Cafe</h2>

        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 ">Privacy</h2>
          <div className="flex flex-col gap-5">
            <a>Terms of Use</a>
            <a>Privacy Policy</a>
            <a>Cookies</a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <div className="flex flex-col gap-5">
            <a>Shop</a>
            <a>Order Ahead</a>
            <a>Menu</a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <div className="flex flex-col gap-5">
            <a>Find Location</a>
            <a>About Us</a>
            <a>Our Story</a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">Information</h2>
          <div className="flex flex-col gap-5">
            <a>Plans & Pricing</a>
            <a>Products</a>
            <a>Jobs</a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Social Media</h2>
          <div className="flex gap-2">
            <a>
              <Facebook />
            </a>

            <a>
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
