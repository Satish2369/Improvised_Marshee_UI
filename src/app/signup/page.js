"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";
import { BASE_URL } from "@/utils/constant";
import { auth } from "@/utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

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
    // Only set up recaptcha when in phone mode and in browser
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

      // Delay the creation slightly to ensure Firebase is ready
      const timer = setTimeout(() => {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: () => {
              // Callback for successful recaptcha verification
            },
          });
        } catch (err) {
          console.error("RecaptchaVerifier init failed:", err.message);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
          } catch (err) {}
          window.recaptchaVerifier = null;
        }
      };
    }
  }, [mode]);

  const handleEmailSignup = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/signup/email`,
        {
          name,
         email:emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(data.data));
      router.push("/");
    } catch (error) {
      console.error("Email signup error:", error.response?.data || error.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      if (!window.recaptchaVerifier) {
        // If recaptchaVerifier isn't ready yet, create it
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }
      
      const appVerifier = window.recaptchaVerifier;
      
      const fullPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("OTP send error:", err.message);
      alert("Failed to send OTP. Please try again.");
      
      // Try to recreate the recaptcha
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (clearErr) {}
        window.recaptchaVerifier = null;
      }
      
      setTimeout(() => {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
          });
        } catch (retryErr) {
          console.error("Retry failed:", retryErr.message);
        }
      }, 1000);
    }
  };

  const handlePhoneVerify = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const fullPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

      const { data } = await axios.post(
        `${BASE_URL}/signup/otp`,
        {
          name,
          phone: fullPhone,
          uid: user.uid,
        },
        { withCredentials: true }
      );

      dispatch(addUser(data.data));
      router.push("/");
    } catch (err) {
      console.error("OTP verify error:", err.message);
      alert("OTP verification failed. Please try again.");
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

        {/* Recaptcha should be rendered at the bottom */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Signup;