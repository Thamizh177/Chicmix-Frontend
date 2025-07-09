"use client";
import React, { useState, useEffect } from "react";
import CustomSelect from "@/app/Reusable-components/Dropdown";
import RangeSlider from "@/app/Reusable-components/Rangeslider";
import { fetchColours, fetchSizes, } from "@/app/lib/api";

interface ParentComponentProps {
  onColorSelect: (color: string | null) => void;
  onSizeSelect: (size: string | null) => void;
  onAvailabilitySelect: (availability: string | null) => void;
  onPriceChange: (price: number) => void;
}

interface Size {
  size: number;
  size_name: string;
  size_description: string;
}

interface Colour {
  colour: number;
  colour_name: string;
  colour_description: string;
}

const ParentComponent: React.FC<ParentComponentProps> = ({
  onColorSelect,
  onSizeSelect,
  onAvailabilitySelect,
  onPriceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeOptions, setSizeOptions] = useState<string[]>([]);
  const [colourOptions, setColourOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const sizes: Size[] = await fetchSizes();
        const colours: Colour[] = await fetchColours();
        setSizeOptions(sizes.map((s) => s.size_name));
        setColourOptions(colours.map((c) => c.colour_name));
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };

    loadFilters();
  }, []);

  const handleSelect = (type: "color" | "size" | "availability", value: string) => {
    console.log(`Selected ${type}:`, value);
    const normalizedValue = value === "Show All" ? null : value;

    if (type === "color") onColorSelect(normalizedValue);
    if (type === "size") onSizeSelect(normalizedValue);
    if (type === "availability") onAvailabilitySelect(normalizedValue);
  };

  return (
    <>
      {/* Sidebar Toggle Button (Only in Mobile View) */}
      <button
        className="md:hidden absolute top-[60px] left-9 bg-purple-500 text-white font-bold px-5 py-2 rounded-lg z-25 mt-7 mb-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40 p-6 w-72 md:w-[300px]  text-center text-xl pt-20 md:ml-6`}
      >
        {/* Price Range */}
        <div className="shadow-md rounded-xl p-3">
          <h2 className="font-semibold">Price Range</h2>
          <RangeSlider min={0} max={5000} onChange={onPriceChange} />
        </div>

        {/* Colour Dropdown */}
        <div className="mt-4">
          <CustomSelect
            options={colourOptions}
            defaultOption="Select Colour"
            onSelect={(value: string) => handleSelect("color", value)}
          />
        </div>

        {/* Size Dropdown */}
        <div className="mt-4">
          <CustomSelect
            options={sizeOptions}
            defaultOption="Select Size"
            onSelect={(value: string) => handleSelect("size", value)}
          />
        </div>

        {/* Availability Dropdown */}
        <div className="mt-4">
          <CustomSelect
            options={["In stock", "Out of stock"]}
            defaultOption="Availability"
            onSelect={(value: string) => handleSelect("availability", value)}
          />
        </div>
      </div>

      {/* Overlay when sidebar is open (Only for Mobile View) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ParentComponent;
