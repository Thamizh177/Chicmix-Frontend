"use client"; // Add this if you're using Next.js App Router

import React, { useEffect, useState } from "react";
import LightButton from "src/website/light-mode-button.png";
import DarkButton from "src/website/dark-mode-button.png";

const DarkMode = () => {
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")!
      : "light"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.documentElement;
      if (theme === "dark") {
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  return (
    <div className="relative">
      <img
        src={LightButton.src} // Fix: Use `.src` to get the image path
        alt="Light Mode"
        onClick={() => setTheme("dark")}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={DarkButton.src} // Fix: Use `.src`
        alt="Dark Mode"
        onClick={() => setTheme("light")}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 ${
          theme === "light" ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default DarkMode;
