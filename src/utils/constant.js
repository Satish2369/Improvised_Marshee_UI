import { FaDog, FaCat, FaHorse, FaDove, FaFrog, FaOtter } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi"; // game icons

export const categories = [
  { name: "Dog", icon: <FaDog /> },
  { name: "Cat", icon: <FaCat /> },
  { name: "Horse", icon: <FaHorse /> },
  { name: "Bird", icon: <FaDove /> },
  { name: "Turtle", icon: <FaFrog /> },
  { name: "Hamster", icon: <FaOtter /> },
  { name: "Rabbit", icon: <GiRabbit /> },  
];

export const BASE_URL =  process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.NEXT_PUBLIC_BACKEND_URL;

