import logo from "./logo.png";
import s1 from "./slider/s1.jpg";
import s2 from "./slider/s2.jpg";
import s3 from "./slider/s3.jpg";
import s4 from "./slider/s4.jpg";
import sr1 from "./sr1.png";
import sr2 from "./sr2.png";
import sr3 from "./sr3.png";
import sr4 from "./sr4.png";

// animation
import error from "./animation/error.json"

export const assets = {
  logo,
  s1, s2, s3, s4,
  error
};


// slider data
export const slider = [
  {
    id: 1,
    img: s1,
  },
  {
    id: 2,
    img: s2,
  },
  {
    id: 3,
    img: s3,
  },
  {
    id: 4,
    img: s4,
  },
];

// service data
export const services = [
  {
    id: 1,
    title: "Free Shipping & Returns",
    description: "For all orders over $199.00",
    icon: sr1,
  },
  {
    id: 2,
    title: "Secure Payment",
    description: "We ensure secure payment",
    icon: sr2,
  },
  {
    id: 3,
    title: "Money Back Guarantee",
    description: "Returning money 30 days",
    icon: sr3,
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    description: "Friendly customer support",
    icon: sr4,
  },
];
