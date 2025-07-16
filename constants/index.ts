import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import dollar from "@/assets/icons/dollar.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import user from "@/assets/icons/user.png";
import arrowBack from "../assets/icons/arrow-back.png";
import arrowDown from "../assets/icons/arrow-down.png";

import avatar from "@/assets/images/avatar.png";
import avocado from "@/assets/images/avocado.png";
import bacon from "@/assets/images/bacon.png";
import burgerOne from "@/assets/images/burger-one.png";
import burgerTwo from "@/assets/images/burger-two.png";
import buritto from "@/assets/images/buritto.png";
import cheese from "@/assets/images/cheese.png";
import coleslaw from "@/assets/images/coleslaw.png";
import cucumber from "@/assets/images/cucumber.png";
import emptyState from "@/assets/images/empty-state.png";
import fries from "@/assets/images/fries.png";
import loginGraphic from "@/assets/images/login-graphic.png";
import logo from "@/assets/images/logo.png";
import mozarellaSticks from "@/assets/images/mozarella-sticks.png";
import mushrooms from "@/assets/images/mushrooms.png";
import onionRings from "@/assets/images/onion-rings.png";
import onions from "@/assets/images/onions.png";
import pizzaOne from "@/assets/images/pizza-one.png";
import salad from "@/assets/images/salad.png";
import success from "@/assets/images/success.png";
import tomatoes from "@/assets/images/tomatoes.png";

import bash2 from "@/assets/images/Cheese_Burst_Fries.png";
import summer1 from "@/assets/images/Double_Cheese_Burger.png";
import summer2 from "@/assets/images/Fries & Coke Combo.png";
import pizza3 from "@/assets/images/Garlic_Breadsticks.png";
import burrito1 from "@/assets/images/Grilled_Chicken_Burrito.png";
import pizza1 from "@/assets/images/Margherita_Pizza.png";
import burrito2 from "@/assets/images/Mexican_Rice_Bowl.png";
import bash1 from "@/assets/images/Spicy_Chicken_Burger.png";
import pizza2 from "@/assets/images/Veg_Supreme_Pizza.png";

export const CATEGORIES = [
  {
    id: "1",
    name: "All",
  },
  {
    id: "2",
    name: "Burger",
  },
  {
    id: "3",
    name: "Pizza",
  },
  {
    id: "4",
    name: "Wrap",
  },
  {
    id: "5",
    name: "Burrito",
  },
];

export const offers = [
  {
    id: 1,
    title: "SUMMER COMBO",
    image: burgerOne,
    color: "#D33B0D",
    description:
      "Chill out this summer with our sizzling combo of juicy burgers and crispy fries. Perfect for a quick bite or a full meal!",
    packages: [
      {
        item: "Double Cheese Burger",
        quantity: 2,
        customs: ["Extra cheese", "No pickles"],
        total: 300,
        image: summer1,
      },
      {
        item: "Fries & Coke Combo",
        quantity: 1,
        customs: ["Large fries"],
        total: 150,
        image: summer2,
      },
    ],
  },
  {
    id: 2,
    title: "BURGER BASH",
    image: burgerTwo,
    color: "#DF5A0C",
    description:
      "Celebrate flavor with our Burger Bash deal! Loaded with spicy, cheesy, and crispy goodness for burger lovers.",
    packages: [
      {
        item: "Spicy Chicken Burger",
        quantity: 2,
        customs: ["No mayo", "Add jalapenos"],
        total: 330,
        image: bash1,
      },
      {
        item: "Cheese Burst Fries",
        quantity: 1,
        customs: ["Cheddar cheese topping"],
        total: 180,
        image: bash2,
      },
    ],
  },
  {
    id: 3,
    title: "PIZZA PARTY",
    image: pizzaOne,
    color: "#084137",
    description:
      "Host the ultimate pizza night with our deliciously crafted pizzas made with fresh dough and exotic toppings.",
    packages: [
      {
        item: "Margherita Pizza",
        quantity: 1,
        customs: ["Thin crust", "Extra basil"],
        total: 250,
        image: pizza1,
      },
      {
        item: "Veg Supreme Pizza",
        quantity: 1,
        customs: ["Stuffed crust", "No olives"],
        total: 350,
        image: pizza2,
      },
      {
        item: "Garlic Breadsticks",
        quantity: 1,
        customs: ["Cheddar cheese topping"],
        total: 100,
        image: pizza3,
      },
    ],
  },
  {
    id: 4,
    title: "BURRITO DELIGHT",
    image: buritto,
    color: "#EB920C",
    description:
      "Wrap your taste buds in a fiesta of flavors with our Burrito Delight—fresh, filling, and fantastic!",
    packages: [
      {
        item: "Grilled Chicken Burrito",
        quantity: 2,
        customs: ["Add sour cream", "No beans"],
        total: 400,
        image: burrito1,
      },
      {
        item: "Mexican Rice Bowl",
        quantity: 1,
        customs: ["Extra guacamole"],
        total: 200,
        image: burrito2,
      },
    ],
  },
];

export const sides = [
  {
    name: "Fries",
    image: fries,
    price: 3.5,
  },
  {
    name: "Onion Rings",
    image: onionRings,
    price: 4.0,
  },
  {
    name: "Mozarella Sticks",
    image: mozarellaSticks,
    price: 5.0,
  },
  {
    name: "Coleslaw",
    image: coleslaw,
    price: 2.5,
  },
  {
    name: "Salad",
    image: salad,
    price: 4.5,
  },
];

export const toppings = [
  {
    name: "Avocado",
    image: avocado,
    price: 1.5,
  },
  {
    name: "Bacon",
    image: bacon,
    price: 2.0,
  },
  {
    name: "Cheese",
    image: cheese,
    price: 1.0,
  },
  {
    name: "Cucumber",
    image: cucumber,
    price: 0.5,
  },
  {
    name: "Mushrooms",
    image: mushrooms,
    price: 1.2,
  },
  {
    name: "Onions",
    image: onions,
    price: 0.5,
  },
  {
    name: "Tomatoes",
    image: tomatoes,
    price: 0.7,
  },
];

export const images = {
  avatar,
  avocado,
  bacon,
  burgerOne,
  burgerTwo,
  buritto,
  cheese,
  coleslaw,
  cucumber,
  emptyState,
  fries,
  loginGraphic,
  logo,
  mozarellaSticks,
  mushrooms,
  onionRings,
  onions,
  pizzaOne,
  salad,
  success,
  tomatoes,
  arrowBack,
  arrowDown,
  arrowRight,
  bag,
  check,
  clock,
  dollar,
  envelope,
  home,
  location,
  logout,
  minus,
  pencil,
  person,
  phone,
  plus,
  search,
  star,
  trash,
  user,
};
