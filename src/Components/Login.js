"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { BASE_URL } from "@/utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, { emailId, password }, {
        withCredentials: true,
      });
      dispatch(addUser(data.data));
      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[90%] max-w-sm p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Dont have an account?
          <button
            onClick={() => router.push("/signup")}
            className="text-yellow-400 hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
