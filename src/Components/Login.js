"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { BASE_URL } from "@/utils/constant";
import { auth } from "@/utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const [mode, setMode] = useState("email"); // "email" or "phone"
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  useEffect(() => {
    // Only set up recaptcha when in phone mode
    if (typeof window !== "undefined" && mode === "phone") {
      // Clean up any existing recaptcha verifier
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (err) {
          console.warn("Recaptcha cleanup error:", err.message);
        }
        window.recaptchaVerifier = null;
      }

      return () => {
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
          } catch (err) {}
          window.recaptchaVerifier = null;
        }
      };
    }
  }, [mode]);

  const handleEmailLogin = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/login/email`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(data.data));
      router.push(redirectPath);
    } catch (error) {
      console.error("Email login error:", error.response?.data || error.message);
    }
  };

  const generateRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (err) {}
      window.recaptchaVerifier = null;
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible"
      });
    } catch (error) {
      console.error("RecaptchaVerifier init failed:", error.message);
      // Add a retry with timeout
      setTimeout(() => {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible"
          });
        } catch (retryError) {
          console.error("Retry failed:", retryError.message);
        }
      }, 1000);
    }
  };

  const handleSendOtp = async () => {
    try {
      generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      
      if (!appVerifier) {
        alert("Verification system is initializing. Please try again in a moment.");
        return;
      }

      const fullPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Firebase OTP error:", error.message);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const { data } = await axios.post(
        `${BASE_URL}/login/otp`,
        { uid: user.uid, phone: user.phoneNumber },
        { withCredentials: true }
      );

      dispatch(addUser(data.data));
      router.push(redirectPath);
    } catch (error) {
      console.error("OTP verification error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[90%] max-w-sm p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode("email")}
            className={`px-4 py-1 rounded-l-full cursor-pointer ${
              mode === "email" ? "bg-yellow-400 text-black" : "bg-gray-700"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`px-4 py-1 rounded-r-full cursor-pointer ${
              mode === "phone" ? "bg-yellow-400 text-black" : "bg-gray-700"
            }`}
          >
            Phone
          </button>
        </div>

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
              onClick={handleEmailLogin}
              className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition cursor-pointer"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
            />

            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
              <button
                onClick={handleSendOtp}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send OTP
              </button>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500 transition cursor-pointer"
            >
              Verify & Login
            </button>
          </>
        )}

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?
          <button
            onClick={() => router.push("/signup")}
            className="text-yellow-400 hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;