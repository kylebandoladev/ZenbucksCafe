import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);

    // Smooth scroll to section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(() => {
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

    // Section detection
    gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: ({ isActive }) => {
          if (isActive) {
            setActiveSection(section.id);
          }
        },
      });
    });
  });

  const linkStyles =
    "cursor-pointer text-nowrap md:text-base text-sm transition-all duration-50 px-2 py-1";
  const activeStyles = "border-b-4 border-white";
  const hoverStyles = "hover:border-b-4 hover:border-white";

  return (
    <nav>
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-12" />
          <p className="font-modern-negra">Zenbucks Cafe</p>
        </Link>
        <ul>
          <li>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("menu");
              }}
              className={`${linkStyles} ${hoverStyles} ${
                activeSection === "menu" ? activeStyles : ""
              }`}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}
              className={`${linkStyles} ${hoverStyles} ${
                activeSection === "about" ? activeStyles : ""
              }`}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#location"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("location");
              }}
              className={`${linkStyles} ${hoverStyles} ${
                activeSection === "location" ? activeStyles : ""
              }`}
            >
              Location
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
