"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import axios from "axios";
import Sidebar from "@/Components/Sidebar";
import CollapsibleMenu from "@/Components/CollapsibleMenu";
import { addUser } from "@/redux/slices/userSlice"; 
import { setLoading } from "@/redux/slices/userSlice";
import { BASE_URL } from "@/utils/constant"; // Ensure this is the correct path to your constants file


export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(pathname);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get( BASE_URL + "/profile",{
        withCredentials: true,
      });
      dispatch(addUser(data));
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  fetchProfile();
}, []);

  if (isAuthPage) return children;

  return (
    <div className="flex min-h-screen">
      
      <div className="ml-[3vw] mt-[1.5vw]">
        <Sidebar />
      </div>

     <div className="w-full min-h-full ml-[2.5vw] mt-[1.2vw] mr-[1.2vw] p-[2vw] pl-[0.1vw] bg-white  rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl ">
        <div className="flex-1 ">
        {children}
      </div>
       <div className="rounded-tl-2xl rounded-tr-2xl">
        <CollapsibleMenu />
      </div>
     </div>

    </div>
  );
}
