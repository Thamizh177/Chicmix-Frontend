"use client";
import React, { useState } from "react";
import ProductGrid from '@/app/Reusable-components/Product-list-container';
import ParentComponent from '@/app/Reusable-components/Filter';

const products = [
  {
    img: "/logoandimages/Animeoversized/AstaBlack_2_CM.jpg",
    alt: "Team Akatsuki",
    name: "Team Akatsuki",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/BaryonMode_2_CM.jpg",
    alt: "Naruto Baryon Mode",
    name: "Naruto Baryon Mode",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"

  },
  {
    img: "/logoandimages/Animeoversized/Berserk_steelgrey_2.jpg",
    alt: "Berserk",
    name: "Berserk",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Dandadan_2_CM.jpg",
    alt: "Dan Dan Dan Okuran",
    name: "Dan Dan Dan Okuran",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Orange,Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/FireFistAce_1.jpg",
    alt: "Fire-Fist Ace Onepiece",
    name: "Fire-Fist Ace Onepiece",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Gabimaru_The_hallow.jpg",
    alt: "Gabimaru-The Hallow",
    name: "Gabimaru-The Hallow",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Gojo-Satoru-2.jpg",
    alt: "Gojo Satoru - The honoured one",
    name: "Gojo Satoru - The honoured one",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Herohunter_2_CM.jpg",
    alt: "Hero Hunter: Garo",
    name: "Hero Hunter: Garo",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Isagi_2_CM.jpg",
    alt: "Isagi Blue-Lock",
    name: "Isagi Blue-Lock",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Red",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Jinwoo_x_ShadowMonarch.jpg",
    alt: "Shadow Monarch:Jinwoo",
    name: "Shadow Monarch:Jinwoo",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/KaijuNo.8_2_CM.jpg",
    alt: "Kaiju No 8",
    name: "Kaiju No 8",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Kenpachi_2_CM.jpg",
    alt: "Kenpachi Zaraki",
    name: "Kenpachi Zaraki",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Madara_2_SusanoCM.jpg",
    alt: "Madara Uchiha Susano",
    name: "Madara Uchiha Susano",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/UltraEgo_2_CM.jpg",
    alt: "Vegeta: Ultra Ego",
    name: "Vegeta: Ultra Ego",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/WarriorofLiberation_2.jpg",
    alt: "Luffy: Warrior of Liberation",
    name: "Luffy: Warrior of Liberation",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/RiseofDeku_2_CM.jpg",
    alt: "Rise of Deku",
    name: "Rise of Deku",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/Shanks_2_CM.jpg",
    alt: "Shanks Onepiece",
    name: "Shanks Onepiece",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
  {
    img: "/logoandimages/Animeoversized/YujiXSukuna_2_CM.jpg",
    alt: "Ryomen Sukuna x Yuji",
    name: "Ryomen Sukuna x Yuji",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Half"
  },
];

const Animehalf = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(5000); // Default max price

  const handleColorSelect = (color: string | null) => {
    setSelectedColor(color === "Show All" ? null : color);
  };
  
  const handleSizeSelect = (size: string | null) => {
    setSelectedSize(size === "Show All" ? null : size);
  };
  
  const handleAvailabilitySelect = (availability: string | null) => {
    setSelectedAvailability(availability === "Show All" ? null : availability);
  };

  const handlePriceChange = (price: number) => {
    setSelectedPrice(price);
  };


  const filteredProducts = products.filter(product => {
    const matchesColor = !selectedColor || product.colour.includes(selectedColor);
    const matchesSize = !selectedSize || product.size.includes(selectedSize);
    const matchesAvailability = !selectedAvailability || product.availability === selectedAvailability;
    const matchesPrice = product.price <= selectedPrice;
  
    return matchesColor && matchesSize && matchesAvailability && matchesPrice;
  });
  

  return (
    <div className="flex flex-row items-start gap-5">
      <ParentComponent
        onColorSelect={handleColorSelect}
        onSizeSelect={handleSizeSelect}
        onAvailabilitySelect={handleAvailabilitySelect}
        onPriceChange={handlePriceChange}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Animehalf;