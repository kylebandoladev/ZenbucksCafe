import { navLinks } from "../src/constants";
import logo from "./assets/logo.png";

const Navbar = () => {
  return (
    <header className="px-10 py-5 z-100">
      <div
        className="mx-auto flex items-center justify-between border px-2
      py-2 rounded-xl font-bold"
      >
        <a href="" className="flex items-center">
          <img src={logo} alt="" className="size-15" />
          Zenbucks
        </a>
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
        <a
          href="#contact
        "
          className=""
        >
          <div className="">
            <span>Contact Us</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
