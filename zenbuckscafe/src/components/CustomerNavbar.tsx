import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";

gsap.registerPlugin(ScrollTrigger);

interface CustomerNavbarProps {
  variant?: "default" | "light";
}

const CustomerNavbar = ({ variant = "default" }: CustomerNavbarProps) => {
  useGSAP(() => {
    if (variant === "default") {
      // Nav background animation
      gsap.fromTo(
        "nav",
        {
          backgroundColor: "transparent",
        },
        {
          backgroundColor: "#00000050",
          backdropFilter: "blur(10px)",
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "nav",
            start: "bottom top",
          },
        }
      );
    }
  });

  const linkStyles =
    "cursor-pointer text-nowrap md:text-base text-sm transition-all duration-50 px-2 py-1 hover:border-b-4 hover:border-black";
  const navStyles = "bg-white text-black shadow-md";

  return (
    <nav className={navStyles}>
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-12" />
          <p className="font-modern-negra text-black">Zenbucks Cafe</p>
        </Link>
        <ul>
          <li>
            <Link
              to="/order"
              className={`${linkStyles} text-black`}
            >
              Order
            </Link>
          </li>
          <li>
            <button
              className={`${linkStyles} text-black`}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
