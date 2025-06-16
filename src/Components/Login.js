"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { useSearchParams } from "next/navigation"; 
import { BASE_URL } from "@/utils/constant";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const  dispatch = useDispatch();

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

    console.log("BASE_URL:", BASE_URL);

  const handleSubmit = async () => {
    const endpoint = isLogin ? "/login" : "/signup";
    const payload = isLogin
      ? { emailId, password }
      : { name, emailId, password };

    try {

     
        console.log(BASE_URL);
        const { data } = await axios.post(BASE_URL+endpoint, payload, {
        withCredentials: true, 
      });
      console.log(" Success:", data);
      console.log(BASE_URL);
        dispatch(addUser(data.data));
          router.push(redirectPath);

    } catch (error) {
       console.log(BASE_URL);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[90%] max-w-sm p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition cursor-pointer"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center cursor-pointer">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-400 hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
