import { useRef, useState } from "react";
import { allCocktails } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Cocktail {
  id: number; // Changed from string to number
  name: string;
  image: string;
  title: string;
  description: string;
}
const MenuShowcase = () => {
  const contentRef = useRef<HTMLDivElement>(null); // Added proper type for ref

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(
      ".details h2",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: "power1.inOut" }
    );
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index: number) => {
    // Added type annotation
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset: number): Cocktail => {
    // Added type annotation and return type
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(+1);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="isolate">
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail mr-25">
          <img
            src={currentCocktail.image}
            className="object-contain size-6/12"
            alt={currentCocktail.name}
          />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info lg:ml-25 lg:mb-20">
            <p>Recipe For:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
