import { navLinks } from "../src/constants";
import logo from "./assets/logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 text-white">
      <div
        className="flex items-center justify-between border border-white/10 lg:mx-10 mt-5 px-7
      py-2 rounded-4xl font-bold backdrop-blur-lg mx-4"
      >
        <div className="flex gap-2">
          <img src={logo} alt="" className="size-15" />
          <a href="" className="flex items-center text-xl">
            Zenbucks
          </a>
        </div>
        <nav className="desktop">
          <ul className="flex space-x-5">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="">
          <div className="">
            <span>Contact Us</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
