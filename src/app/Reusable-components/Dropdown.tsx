"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

interface CustomSelectProps {
  options: string[];
  defaultOption?: string;
  onSelect?: (option: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultOption = "Select an option",
  onSelect,
}) => {
  const [selected, setSelected] = useState<string>(defaultOption);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    if (option === selected) return;
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative w-64 cursor-pointer mt-8 mx-auto">
      {/* Select Box */}
      <div
        className="bg-white px-6 py-3 text-black font-medium rounded-md flex justify-between items-center text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
      </div>

      {/* Options List */}
      {isOpen && (
        <div className="relative w-full z-50 rounded-md mt-2 p-2 max-h-44 overflow-x-auto ">
          {/* "Show All" option instead of "None" */}
          <div
            className="py-2 text-center text-gray-500 font-medium hover:text-black transition-all"
            onClick={() => handleSelect("Show All")}
          >
            Show All
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className={`py-2 text-center font-medium transition-all ${
                selected === option ? "text-black font-bold" : "text-gray-500"
              } hover:text-black`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
