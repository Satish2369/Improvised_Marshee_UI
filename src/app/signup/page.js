"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { BASE_URL } from "@/utils/constant";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "@/utils/firebase"; 

const Signup = () => {
  const [mode, setMode] = useState("email");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined" && mode === "phone" && !window.recaptchaVerifier) {
      const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      });
    }
  }, [mode]);

  const handleEmailSignup = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/signup/email`, {
        name,
        emailId,
        password,
      }, { withCredentials: true });

      dispatch(addUser(data.data));
      router.push("/");
    } catch (error) {
      console.error("Email signup error:", error.response?.data || error.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      const auth = getAuth();
      const appVerifier = window.recaptchaVerifier;

      const fullPhone = `+91${phone}`; 
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err) {
      console.error("OTP send error", err.message);
    }
  };

  const handlePhoneVerify = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const { data } = await axios.post(`${BASE_URL}/signup/otp`, {
        name,
        phone,
        uid: user.uid,
      }, { withCredentials: true });

      dispatch(addUser(data.data));
      router.push("/");
    } catch (err) {
      console.error("OTP verify error", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[90%] max-w-sm p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <div className="flex justify-center mb-4 gap-4">
          <button
            className={`px-4 py-1 rounded ${mode === "email" ? "bg-yellow-400 text-black" : "bg-gray-700"}`}
            onClick={() => setMode("email")}
          >
            Email
          </button>
          <button
            className={`px-4 py-1 rounded ${mode === "phone" ? "bg-yellow-400 text-black" : "bg-gray-700"}`}
            onClick={() => setMode("phone")}
          >
            Phone
          </button>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
        />

        {mode === "email" ? (
          <>
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
              onClick={handleEmailSignup}
              className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
            >
              Sign Up with Email
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
            />
            {otpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
              />
            )}
            <button
              onClick={otpSent ? handlePhoneVerify : handleSendOtp}
              className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition"
            >
              {otpSent ? "Verify OTP & Signup" : "Send OTP"}
            </button>
            <div id="recaptcha-container"></div>
          </>
        )}

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-yellow-400 hover:underline cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
