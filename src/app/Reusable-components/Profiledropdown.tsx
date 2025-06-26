"use client";
import { useState, useRef, useEffect } from "react";
import { IoMdContact } from "react-icons/io";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { requestOTP, verifyOTP, logoutUser } from "@/app/lib/api";
import { Honk } from "next/font/google";
import ProfileModal from "@/app/Reusable-components/Profile";
import Cookies from "js-cookie";


const honk = Honk({
  subsets: ['latin'],
  weight: ['400'],
});

export default function ProfileDropdownWithLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "info" | "">("");
  const [step, setStep] = useState<"idle" | "otp_sent" | "verifying" | "verified">("idle");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const resetLoginState = () => {
    setPhone("");
    setOtp("");
    setOtpRequested(false);
    setTimer(0);
    setAttempts(0);
    setLockoutTimer(0);
    setIsOpen(false);
    setStatusMessage("");
    setStatusType("");
    setStep("idle");
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutTimer > 0) {
      interval = setInterval(() => setLockoutTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => resetLoginState();

  const handleRequestOTP = async () => {
    try {
      const fullPhone = phone.trim();
      const countryCode = "+" + fullPhone.slice(0, fullPhone.length - 10);
      const mobileNumber = fullPhone.slice(-10);

      const data = await requestOTP(mobileNumber, countryCode);

      setOtpRequested(true);
      setOtp("");
      setTimer(30);
      setAttempts(0);
      setStatusMessage("OTP sent successfully!");
      setStatusType("success");
      setStep("otp_sent");
    } catch (err: any) {
      console.log("OTP request error:", err);
      let errorMsg = "";

      const errorMap: Record<string, string> = {
        "Only digits are allowed in the mobile number.": "Please enter only digits.",
        "Invalid mobile number.": "The mobile number entered is not valid.",
        "Invalid phone number format.": "Please enter a valid phone number.",
        "This field may not be blank.": "Please enter your mobile number.",
      };

      if (typeof err === "string") {
        errorMsg = err;
      } else if (typeof err === "object" && err !== null) {
        if (Array.isArray(err.mobile_number)) {
          const message = err.mobile_number[0];
          errorMsg = errorMap[message] || message;
        } else if (Array.isArray(err.non_field_errors)) {
          const message = err.non_field_errors[0];

          if (message.includes("maximum OTP attempts")) {
            setLockoutTimer(600);
          } else if (message.includes("once every 60 seconds")) {
            setTimer(60);
          }

          errorMsg = message;
        } else if (typeof err.detail === "string") {
          errorMsg = err.detail;
        } else {
          errorMsg = "Something went wrong. Please try again.";
        }
      } else {
        errorMsg = "Something went wrong. Please try again.";
      }

      setStatusMessage(errorMsg);
      setStatusType("error");
    }
  };

  const handleVerifyOTP = async () => {
    if (lockoutTimer > 0) {
      setStatusMessage(`You are blocked. Please try again after ${lockoutTimer} seconds.`);
      setStatusType("error");
      return;
    }

    if (!otp || otp.length !== 6) {
      setStatusMessage("Please enter a valid 6-digit OTP.");
      setStatusType("error");
      return;
    }

    try {
      setStep("verifying");
      const fullPhone = phone.trim();
      const mobileNumber = fullPhone.slice(-10);
      const data = await verifyOTP(mobileNumber, parseInt(otp));

      if (data.success && data.tokens) {
        const { access, refresh } = data.tokens;
        Cookies.set("accessToken", access, { expires: 1 });
        Cookies.set("refreshToken", refresh, { expires: 7 });

        const parseJwt = (token: string) => {
          try {
            return JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
            return null;
          }
        };

        const decoded = parseJwt(access);
        const expiry = decoded?.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = (expiry - currentTime) * 1000;

        setTimeout(() => {
          handleLogout();
        }, remainingTime);

        setStatusMessage("Login successful! 🎉");
        setStatusType("success");
        setStep("verified");
        setIsLoggedIn(true);

        setTimeout(() => {
          resetLoginState();
        }, 1500);
      } else {
        const errorMsg = data?.message || data?.errors?.otp || data?.error || "OTP verification failed.";
        setStatusMessage(errorMsg);
        setStatusType("error");

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
          setLockoutTimer(600);
          setStatusMessage("You have entered wrong OTP 3 times. Try again after 10 minutes.");
          setStatusType("error");
        }

        setStep("otp_sent");
      }
    } catch (err: any) {
      const nonFieldErrors =
        err?.response?.data?.errors?.non_field_errors ||
        err?.errors?.non_field_errors || [];

      let errorMsg = "Something went wrong.";

      if (nonFieldErrors.length > 0) {
        const message = nonFieldErrors[0];

        switch (message) {
          case "No OTP request found.":
            errorMsg = "No OTP request found for this number.";
            break;
          case "You have given the wrong OTP 3 times. Please try again after 10 minutes.":
            errorMsg = message;
            setLockoutTimer(600);
            break;
          case "Maximum OTP attempts exceeded.":
            errorMsg = "You have exceeded the maximum OTP attempts.";
            break;
          case "OTP has already been verified.":
            errorMsg = "This OTP is already used.";
            break;
          case "OTP has expired.":
            errorMsg = "Your OTP has expired. Please request a new one.";
            break;
          case "Incorrect OTP.":
            errorMsg = "The OTP you entered is incorrect.";
            setAttempts((prev) => prev + 1);
            break;
        }
      }

      setStatusMessage(errorMsg);
      setStatusType("error");
      setStep("otp_sent");
    }
  };

  const handleLogout = async () => {
    const refreshToken = Cookies.get("refreshToken");
    const accessToken = Cookies.get("accessToken");

    if (!refreshToken || !accessToken) {
      setStatusMessage("Missing tokens. Cannot logout.");
      setStatusType("error");
      setIsLoggedIn(false);
      resetLoginState();
      return;
    }

    try {
      await logoutUser(refreshToken, accessToken);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      setStatusMessage("You have been logged out successfully. 👋");
      setStatusType("success");
      setIsLoggedIn(false);

      setTimeout(() => {
        resetLoginState();
      }, 2000);
    } catch (err: unknown) {
      console.error("Logout error:", err);
      const error = err as { message?: string; error?: string };
      const errorMsg = error?.message || error?.error || "Logout failed. Please try again.";
      setStatusMessage(errorMsg);
      setStatusType("error");
    }
  };

return (
  <div className="relative inline-block w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl" ref={dropdownRef}>
    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
      <IoMdContact className="text-3xl sm:text-4xl lg:text-5xl mt-4 lg:mt-7 mb-2" />
    </button>

    {dropdownOpen && (
      <div className="absolute right-0 mt-2 z-50 flex flex-col items-end shadow-xl">
        <div className="w-5 h-5 bg-white rotate-45 transform -mb-3 mr-3"></div>
        <div className="w-40 bg-white rounded-md">
          <ul className="py-2 text-gray-700">
            {!isLoggedIn ? (
              <li>
                <button
                  onClick={() => {
                    openPopup();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-center font-bold px-4 py-2 hover:text-red-600"
                >
                  Login
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => setProfileOpen(true)}
                    className="block w-full text-center font-bold px-4 py-2 hover:text-red-600"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="block w-full text-center font-bold px-4 py-2 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>

                <ProfileModal
                  isOpen={isProfileOpen}
                  onClose={() => setProfileOpen(false)}
                  onSubmit={(data) => {
                    console.log("Profile form submitted:", data);
                    setProfileOpen(false);
                  }}
                />
              </>
            )}
          </ul>
        </div>
      </div>
    )}

    {showLogoutConfirm && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm text-center relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowLogoutConfirm(false);
                handleLogout();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    )}

    {isOpen && (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
          <button
            onClick={closePopup}
            className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Login</h2>

          {statusMessage && (
            <div
              className={`mb-4 text-sm font-medium px-4 py-2 rounded ${
                statusType === "success"
                  ? "bg-green-100 text-green-800"
                  : statusType === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {step === "verified" ? (
            <h1 className={`${honk.className} text-3xl sm:text-4xl`}>Welcome to Chicmix!</h1>
          ) : (
            <form className="w-full">
              <div className="mb-4">
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  containerStyle={{
                    width: "100%",
                    border: "1px solid #000000",
                    borderRadius: "8px",
                    padding: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "36px",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  buttonStyle={{
                    border: "none",
                    background: "transparent",
                    marginRight: "8px",
                  }}
                />
              </div>

              {otpRequested && (
                <>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter OTP"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={lockoutTimer > 0}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {lockoutTimer > 0
                      ? `Too many failed attempts. Try again in ${lockoutTimer} seconds.`
                      : timer > 0
                      ? `You can request OTP again in ${timer} seconds.`
                      : "You can now request OTP again."}
                  </p>
                </>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    (otpRequested && timer > 0) ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-purple-600"
                  }`}
                  disabled={(otpRequested && timer > 0) || lockoutTimer > 0}
                >
                  {otpRequested ? "Resend OTP" : "Get OTP"}
                </button>

                {otpRequested && (
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-purple-600 transition"
                    disabled={lockoutTimer > 0}
                  >
                    {step === "verifying" ? "Verifying..." : "Verify OTP"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    )}

    {statusMessage && statusType === "success" && !isOpen && (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow-lg">
          {statusMessage}
        </div>
      </div>
    )}
  </div>
);


  


}
