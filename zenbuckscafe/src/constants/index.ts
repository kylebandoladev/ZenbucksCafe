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
    price: "150",
  },
  {
    name: "Mocha",
    imgPath: "/components/assets/coffeeCarousel2.png",
    description: "A chocolate-flavored variant of a latte, made with espresso.",
    price: "130",
  },
  {
    name: "Macchiato",
    imgPath: "/components/assets/coffeeCarousel3.jpg",
    description: "An espresso coffee drink with a small amount of steamed milk",
    price: "120",
  },
  {
    name: "Macchiato",
    imgPath: "/components/assets/coffeeCarousel3.jpg",
    description: "An espresso coffee drink with a small amount of steamed milk",
    price: "120",
  },
];

export const featureLists = [
  "Perfectly balanced blends",
  "Garnished to perfection",
  "Ice-cold every time",
  "Expertly shaken & stirred",
];

export const goodLists = [
  "Handpicked ingredients",
  "Signature techniques",
  "Bartending artistry in action",
  "Freshly muddled flavors",
];

export const allCocktails = [
  {
    id: 1,
    name: "Classic Mojito",
    image: "/images/menu1.png",
    title: "Simple Ingredients, Bold Flavor",
    description:
      "Made with tequila, lime juice, and orange liqueur, the Margarita is easy to make and full of character. Add a salted rim for the perfect menu on summer nights.",
  },
  {
    id: 2,
    name: "Raspberry Mojito",
    image: "/images/menu2.png",
    title: "A Zesty Classic That Never Fails",
    description:
      "The Margarita is a classic that balances tangy lime, smooth tequila, and a touch of sweetness. Shaken, frozen, or on the rocks—it’s always crisp & refreshing.",
  },
  {
    id: 3,
    name: "Violet Breeze",
    image: "/images/menu3.png",
    title: "Simple Ingredients, Bold Flavor",
    description:
      "Made with tequila, lime juice, and orange liqueur, the Margarita is easy to make and full of character. Add a salted rim for the perfect menu on summer nights.",
  },
  {
    id: 4,
    name: "Curacao Mojito",
    image: "/images/menu4.png",
    title: "Crafted With Care, Poured With Love",
    description:
      "Each cocktail is made with fresh ingredients and a passion for perfecting every pour, whether you're celebrating or simply relaxing.",
  },
];
