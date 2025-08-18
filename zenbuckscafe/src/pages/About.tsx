import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import abt1 from "/images/abt1.jpg";
import abt2 from "/images/abt2.jpg";
import abt3 from "/images/abt3.jpg";
import abt4 from "/images/abt4.jpg";
import abt5 from "/images/abt5.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    // Use 'new' instead of 'create'
    const titleSplit = new SplitText("#about h2", {
      type: "words",
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5"
      );
  });

  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">About us</p>
            <h2>
              Where Every Detail Matters <span className="text-white">-</span>
              From Murdle to Garnish
            </h2>
          </div>
          <div className="sub-content">
            <p>
              At Zenbucks Cafe, we believe that every drinks tells a story. From
              the meticulous selection of ingredients to the artistry of
              presentation, our drinks are crafted with passion and precision.
              Join us in celebrating the art of mixology, where each sip is a
              journey through flavor and creativity.
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.4</span>/5
              </p>
              <p className="text-sm text-white-100">
                Based on 100,000+ reviews
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy">
            <img
              src={abt3}
              alt="Coffee presentation"
              className="rounded-lg"
              loading="eager"
            />
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="noisy">
            <img src={abt1} alt="Coffee shop interior" className="rounded-lg" />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="noisy">
            <img src={abt5} alt="Coffee beans" className="rounded-lg" />
          </div>
        </div>
      </div>
      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy">
            <img src={abt2} alt="Food presentation" className="rounded-lg" />
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="noisy">
            <img src={abt4} alt="Cafe atmosphere" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
