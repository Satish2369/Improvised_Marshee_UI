"use client";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { removeUser } from "@/redux/slices/userSlice"; // adjust path as needed
import { BASE_URL } from "@/utils/constant"; // adjust path as needed


const CollapsibleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();
  

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL+"/logout",{}, {
        withCredentials: true,
      });
      console.log("Logout successful");
      dispatch(removeUser());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" m-[2vw]    absolute right-0 top-0 h-full z-50 flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-12 w-12 absolute mt-4 mr-6 right-0 z-10 flex items-center justify-center cursor-pointer`}
      >
        {isOpen ? (
          <RxCross2 size={36} className="text-[#333333]" />
        ) : (
          <RxHamburgerMenu size={36} className="text-[#333333]" />
        )}
      </button>

      <div
        className={`bg-white w-64 h-full shadow-xl rounded-tl-2xl rounded-tr-2xl transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mt-[6vw]">
          <ul className="space-y-1 text-black ">
            {["Profile", "Notifications", "Orders", "Wallet", "Settings"].map(
              (item) => (
                <li key={item} className="m-2">
                  <button className="w-full text-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    {item}
                  </button>
                </li>
              )
            )}

            <li className="m-8">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-center text-white p-2 bg-red-600 rounded cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="w-full text-center text-white p-2 bg-[#320505] rounded cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleMenu;
