'use client';


import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { products } from "@/utils/product";



const ProductContainer = ({ id, name, price, category,image }) => {
  const dispatch = useDispatch();

  const item = useSelector((store) =>
    store.cart.items.find((item) => item.id === id)
  );
  const quantity = item ? item.quantity : 0;

  const handleAddItem = () => {
    const product = products.find((pro) => pro.id === id);
    dispatch(addToCart(product));
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="h-[220px] w-[242px] border rounded-md border-white p-2 m-1.5">
      <div className="flex justify-center mb-1">
        <Image
          src={image}
          alt="product_Image"
          height={98}
          width={98}
        />
      </div>
      <div className="text-[12px] text-center pt-0.5">{name}</div>
      <div className="flex justify-between mt-12">
        <div className="text-[15px]">₹{price}</div>
        <div className="border border-white w-[5vw] rounded-4xl flex justify-center items-center">
          <div className="p-0.5 cursor-pointer" onClick={handleAddItem}>
            <IoMdAdd />
          </div>
          <div className="p-0.5 cursor-pointer">{quantity}</div>
          <div className="p-0.5 cursor-pointer" onClick={handleRemoveItem}>
            <RiSubtractLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
