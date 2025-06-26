"use client";
import React, { useState, useEffect } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 3000,
  defaultValue = 200,
  onChange,
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 mb-6">
      {/* Slider Input */}
      <div className="relative w-[80%] max-w-[300px]">
        <input
          type="range"
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer transition-all"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          aria-label="Range slider"
        />
      </div>

      {/* Fixed Value Display Below */}
      <div className="mt-2 px-3 py-1 bg-gray-800 text-white text-sm font-medium rounded-md">
        {value}
      </div>
    </div>
  );
};

export default RangeSlider;
