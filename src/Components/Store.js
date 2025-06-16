"use client";

import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { products } from "@/utils/product";
import ProductContainer from "@/Components/ProductContainer";
import { categories } from "@/utils/constant";
import { useSelector } from "react-redux";
import CartSidebar from "./CartSideBar";
import { PiHandbagBold } from "react-icons/pi";




export default function Search() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const filtered = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesQuery && matchesCategory;
  });

  const totalItems = useSelector((store) =>
    store.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const cartItems = useSelector((store) => store.cart.items);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center w-[762px]">
      <div className="flex flex-col items-center mt-2 ml-[6vw]">
          <div className="flex flex-col px-6 pt-2 w-full">
      {/* Search Bar + Bag */}
      <div className="flex items-start justify-start">
        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="relative"
          style={{ width: "800px", height: "56px" }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pr-[145px] h-full text-black bg-white border border-zinc-300 rounded-xl px-4"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 h-full w-[137px] bg-yellow-300 text-black border-yellow-500 rounded-xl hover:bg-yellow-400"
          >
            Search
          </button>
        </form>

        {/* Handbag Icon */}
        <div
          className="ml-[5vw] mt-2 relative cursor-pointer"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <PiHandbagBold size={32} className="text-black" />
          <span className="absolute -top-2 -right-3 w-3.5 h-3.5 bg-green-300 rounded-full border-2 border-white"></span>
        </div>
      </div>



      <div className="flex   justify-start items-center mt-4 gap-6">

  
   
      <div className="flex items-center gap-3 mt-6 bg-white w-[440px] py-3 rounded-xl border border-gray-300  px-3">
        <div className="text-black text-[15px] ml-3.5">Filter search</div>
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-yellow-300 rounded-full mx-4"></div>
        ))}
      </div>

       <div className="flex items-center gap-3 mt-6 bg-white w-[330px]  rounded-xl border py-2 border-gray-300  px-3">
          <div className="text-black text-[16px] ml-[0.5vw]">Show results for</div>
          <div className="bg-yellow-300 px-4 py-2 rounded-md">Max</div>
          <div className="bg-black text-white px-6 rounded-md py-2">Loki</div>
         
      
      </div>

 
     
          </div>
    </div>
      </div>

      <div className="flex gap-3 mt-6 flex-wrap justify-center">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(isActive ? null : cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className={`${isActive ? "text-white" : "text-blue-500"}`}>
                {cat.icon}
              </span>
              <span className="font-medium">{cat.name}</span>
            </div>
          );
        })}
      </div>

    
      <div className="flex flex-wrap mt-4">
        {filtered.map((product) => {
          return (
            <ProductContainer
              key={product.name}
              name={product.name}
              price={product.price}
              category={product.category}
              id={product.id}
              image={product.image}
            />
          );
        })}
      </div>

      <div>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
}
