export const navLinks = [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "Coffee",
    link: "#coffee",
  },
  {
    name: "Milktea",
    link: "#milktea",
  },
  {
    name: "Shop",
    link: "#shop",
  },
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Login",
    link: "#login",
  },
];

export const coffeeShowcase = [
  {
    name: "Black Coffee",
    imgPath: "/components/assets/coffee1.png",
    description:
      "A strong and bold coffee made by forcing hot water through finely-ground coffee beans.",
  },
  {
    name: "Latte",
    imgPath: "/components/assets/coffee2.png",
    description:
      "A creamy coffee drink made with espresso and steamed milk, topped with a layer of froth.",
  },
  {
    name: "Cappuccino",
    imgPath: "/components/assets/coffee3.png",
    description:
      "A rich coffee drink made with equal parts espresso, steamed milk, and frothed milk.",
  },
];

type CoffeeItem = {
  name: string;
  imgPath: string;
  description: string;
  price: string; // Add this
};

export const coffeeCarousel: CoffeeItem[] = [
  {
    name: "Late",
    imgPath: "/components/assets/coffeeCarousel1.png",
    description: "A concentrated coffee brewed by forcing hot water.",
    price: "P150",
  },
  {
    name: "Mocha",
    imgPath: "/components/assets/coffeeCarousel2.png",
    description: "A chocolate-flavored variant of a latte, made with espresso.",
    price: "P130",
  },
  {
    name: "Macchiato",
    imgPath: "/components/assets/coffeeCarousel3.jpg",
    description: "An espresso coffee drink with a small amount of steamed milk",
    price: "P120",
  },
  {
    name: "Macchiato",
    imgPath: "/components/assets/coffeeCarousel3.jpg",
    description: "An espresso coffee drink with a small amount of steamed milk",
    price: "P120",
  },
];
