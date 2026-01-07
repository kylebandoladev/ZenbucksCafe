export const coffeeShowcase = [
  {
    name: "Black Coffee",
    imgPath: "/images/coffee1.png",
    description:
      "A strong and bold coffee made by forcing hot water through finely-ground coffee beans.",
  },
  {
    name: "Latte",
    imgPath: "/images/coffee2.png",
    description:
      "A creamy coffee drink made with espresso and steamed milk, topped with a layer of froth.",
  },
  {
    name: "Cappuccino",
    imgPath: "/images/coffee3.png",
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
    imgPath: "/images/coffeeCarousel1.png",
    description: "A concentrated coffee brewed by forcing hot water.",
    price: "150",
  },
  {
    name: "Mocha",
    imgPath: "/images/coffeeCarousel2.png",
    description: "A chocolate-flavored variant of a latte, made with espresso.",
    price: "130",
  },
  {
    name: "Macchiato",
    imgPath: "/images/coffeeCarousel3.jpg",
    description: "An espresso coffee drink with a small amount of steamed milk",
    price: "120",
  },
  {
    name: "Macchiato",
    imgPath: "/images/coffeeCarousel3.jpg",
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
      "The Margarita is a classic that balances tangy lime, smooth tequila, and a touch of sweetness. Shaken, frozen, or on the rocks—it's always crisp & refreshing.",
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

// Menu Categories
export const menuCategories = [
  {
    id: "drinks",
    name: "Drinks",
    subcategories: [
      "Hot Coffee",
      "Cold Coffee",
      "Hot Tea",
      "Cold Tea",
      "Refreshers",
      "Frappuccino• Blended Beverage",
      "Hot Chocolate, Lemonade & More",
      "Bottled Beverages",
    ],
  },
  {
    id: "food",
    name: "Food",
    subcategories: ["Breakfast", "Bakery", "Treats", "Lunch", "Snacks"],
  },
  {
    id: "at-home",
    name: "At Home Coffee",
    subcategories: ["Whole Bean", "VIA• Instant"],
  },
];

// Menu Item Interface
export interface MenuItem {
  name: string;
  image: string;
  description: string;
  price: string;
  popular: boolean;
  prepTime: string;
  category: string;
  subcategory: string;
  calories: number;
}

// All Menu Items
export const allMenuItems: MenuItem[] = [
  // Drinks - Hot Coffee
  {
    name: "Hot Coffee",
    image: "/images/coffee4.png",
    description: "Rich, bold coffee brewed to perfection",
    price: "₱120",
    popular: true,
    prepTime: "2-3 min",
    category: "drinks",
    subcategory: "Hot Coffee",
    calories: 5,
  },
  {
    name: "Espresso",
    image: "/images/coffee4.png",
    description: "Intense, concentrated coffee shot",
    price: "₱145",
    popular: true,
    prepTime: "1-2 min",
    category: "drinks",
    subcategory: "Hot Coffee",
    calories: 5,
  },
  {
    name: "Cappuccino",
    image: "/images/coffee4.png",
    description: "Espresso with steamed milk and foam",
    price: "₱185",
    popular: true,
    prepTime: "2-3 min",
    category: "drinks",
    subcategory: "Hot Coffee",
    calories: 120,
  },
  // Drinks - Cold Coffee
  {
    name: "Cold Coffee",
    image: "/images/coffee5.png",
    description: "Smooth cold brew served over ice",
    price: "₱160",
    popular: false,
    prepTime: "1-2 min",
    category: "drinks",
    subcategory: "Cold Coffee",
    calories: 5,
  },
  {
    name: "Iced Latte",
    image: "/images/coffee5.png",
    description: "Espresso with cold milk over ice",
    price: "₱210",
    popular: true,
    prepTime: "2-3 min",
    category: "drinks",
    subcategory: "Cold Coffee",
    calories: 130,
  },
  // Drinks - Hot Tea
  {
    name: "Hot Tea",
    image: "/images/coffee6.png",
    description: "Premium loose leaf tea selection",
    price: "₱145",
    popular: false,
    prepTime: "3-4 min",
    category: "drinks",
    subcategory: "Hot Tea",
    calories: 2,
  },
  {
    name: "Green Tea",
    image: "/images/coffee6.png",
    description: "Antioxidant-rich green tea",
    price: "₱160",
    popular: false,
    prepTime: "3-4 min",
    category: "drinks",
    subcategory: "Hot Tea",
    calories: 2,
  },
  // Drinks - Cold Tea
  {
    name: "Cold Tea",
    image: "/images/coffeeCarousel3.jpg",
    description: "Refreshing iced tea with natural flavors",
    price: "₱135",
    popular: false,
    prepTime: "1-2 min",
    category: "drinks",
    subcategory: "Cold Tea",
    calories: 90,
  },
  // Drinks - Refreshers
  {
    name: "Refreshers",
    image: "/images/coffeeCarousel1.png",
    description: "Fruity, energizing beverages with real fruit",
    price: "₱220",
    popular: true,
    prepTime: "2-3 min",
    category: "drinks",
    subcategory: "Refreshers",
    calories: 140,
  },
  // Drinks - Frappuccino
  {
    name: "Frappuccino• Blended Beverage",
    image: "/images/coffeeCarousel2.png",
    description: "Creamy blended coffee with whipped cream",
    price: "₱260",
    popular: true,
    prepTime: "3-4 min",
    category: "drinks",
    subcategory: "Frappuccino• Blended Beverage",
    calories: 380,
  },
  // Drinks - Hot Chocolate
  {
    name: "Hot Chocolate, Lemonade & More",
    image: "/images/coffee8.png",
    description: "Specialty beverages for every taste",
    price: "₱195",
    popular: false,
    prepTime: "2-3 min",
    category: "drinks",
    subcategory: "Hot Chocolate, Lemonade & More",
    calories: 250,
  },
  // Drinks - Bottled
  {
    name: "Bottled Beverages",
    image: "/images/coffee7.png",
    description: "Premium bottled drinks and juices",
    price: "₱110",
    popular: false,
    prepTime: "Ready now",
    category: "drinks",
    subcategory: "Bottled Beverages",
    calories: 150,
  },
  // Food - Breakfast
  {
    name: "Avocado Toast",
    image: "/images/coffee4.png",
    description: "Sourdough toast with fresh avocado and poached eggs",
    price: "₱445",
    popular: true,
    prepTime: "5-7 min",
    category: "food",
    subcategory: "Breakfast",
    calories: 420,
  },
  {
    name: "Breakfast Sandwich",
    image: "/images/coffee5.png",
    description: "Egg, cheese, and bacon on a croissant",
    price: "₱375",
    popular: true,
    prepTime: "4-6 min",
    category: "food",
    subcategory: "Breakfast",
    calories: 380,
  },
  {
    name: "Pancakes",
    image: "/images/coffee6.png",
    description: "Fluffy pancakes with maple syrup",
    price: "₱495",
    popular: false,
    prepTime: "8-10 min",
    category: "food",
    subcategory: "Breakfast",
    calories: 520,
  },
  // Food - Bakery
  {
    name: "Chocolate Croissant",
    image: "/images/coffee4.png",
    description: "Buttery croissant with rich chocolate",
    price: "₱225",
    popular: true,
    prepTime: "Ready now",
    category: "food",
    subcategory: "Bakery",
    calories: 280,
  },
  {
    name: "Blueberry Muffin",
    image: "/images/coffee5.png",
    description: "Fresh baked muffin with blueberries",
    price: "₱195",
    popular: false,
    prepTime: "Ready now",
    category: "food",
    subcategory: "Bakery",
    calories: 320,
  },
  {
    name: "Cinnamon Roll",
    image: "/images/coffee6.png",
    description: "Warm cinnamon roll with cream cheese frosting",
    price: "₱260",
    popular: true,
    prepTime: "2-3 min",
    category: "food",
    subcategory: "Bakery",
    calories: 420,
  },
  // Food - Treats
  {
    name: "Chocolate Chip Cookie",
    image: "/images/coffee4.png",
    description: "Fresh baked cookie with chocolate chips",
    price: "₱145",
    popular: true,
    prepTime: "Ready now",
    category: "food",
    subcategory: "Treats",
    calories: 180,
  },
  {
    name: "Brownie",
    image: "/images/coffee5.png",
    description: "Rich, fudgy chocolate brownie",
    price: "₱175",
    popular: true,
    prepTime: "Ready now",
    category: "food",
    subcategory: "Treats",
    calories: 250,
  },
  // Food - Lunch
  {
    name: "Caesar Salad",
    image: "/images/coffee6.png",
    description: "Fresh romaine with caesar dressing",
    price: "₱545",
    popular: false,
    prepTime: "5-7 min",
    category: "food",
    subcategory: "Lunch",
    calories: 320,
  },
  {
    name: "Turkey Sandwich",
    image: "/images/coffee4.png",
    description: "Sliced turkey with vegetables on artisan bread",
    price: "₱475",
    popular: true,
    prepTime: "4-6 min",
    category: "food",
    subcategory: "Lunch",
    calories: 380,
  },
  // Food - Snacks
  {
    name: "Mixed Nuts",
    image: "/images/coffee5.png",
    description: "Premium selection of roasted nuts",
    price: "₱245",
    popular: false,
    prepTime: "Ready now",
    category: "food",
    subcategory: "Snacks",
    calories: 280,
  },
  {
    name: "Granola Bar",
    image: "/images/coffee6.png",
    description: "Healthy granola bar with nuts and honey",
    price: "₱160",
    popular: false,
    prepTime: "Ready now",
    category: "food",
    subcategory: "Snacks",
    calories: 200,
  },
  // At Home - Whole Bean
  {
    name: "Colombian Whole Bean",
    image: "/images/coffee4.png",
    description: "Premium Colombian coffee beans, 12oz bag",
    price: "₱845",
    popular: true,
    prepTime: "Ready now",
    category: "at-home",
    subcategory: "Whole Bean",
    calories: 0,
  },
  {
    name: "Ethiopian Whole Bean",
    image: "/images/coffee5.png",
    description: "Single origin Ethiopian coffee, 12oz bag",
    price: "₱945",
    popular: false,
    prepTime: "Ready now",
    category: "at-home",
    subcategory: "Whole Bean",
    calories: 0,
  },
  // At Home - VIA Instant
  {
    name: "Classic VIA Instant",
    image: "/images/coffee6.png",
    description: "Instant coffee packets, 8 count",
    price: "₱645",
    popular: true,
    prepTime: "Ready now",
    category: "at-home",
    subcategory: "VIA• Instant",
    calories: 0,
  },
];
