// components/ToastMessage.tsx
"use client";
import React, { useEffect } from "react";

interface ToastMessageProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // auto dismiss in 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white transition-opacity ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

export default ToastMessage;
