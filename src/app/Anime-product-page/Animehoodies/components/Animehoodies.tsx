"use client";
import React, { useState } from "react";
import ProductGrid from '@/app/Reusable-components/Product-list-container';
import ParentComponent from '@/app/Reusable-components/Filter';

const products = [
  {
    img: "/logoandimages/Animehoodies/Akatsuki_Team_1.jpg",
    alt: "Team Akatsuki",
    name: "Team Akatsuki",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Berserk_1.jpg",
    alt: "Bersek",
    name: "Bersek",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"

  },
  {
    img: "/logoandimages/Animehoodies/Black_Clover_Bulls_2.jpg",
    alt: "Black Clover Bulls",
    name: "Black Clover Bulls",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Bleach11th_Division_Uniform_1.jpg",
    alt: "Bleach 11th Division Uniform",
    name: "Bleach 11th Division Uniform",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Orange,Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Dan-Dan-Dan-Okarun.jpg",
    alt: "Dan Dan Dan",
    name: "Dan Dan Dan Okarun",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Death_Reaper_Seal_1.jpg",
    alt: "Death Reaper Seal",
    name: "Death Reaper Seal",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Eren_Yeager_X_Freedom_1.jpg",
    alt: "Eren Yeager Freedom",
    name: "Eren Yeager Freedom",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Gabimaru-TheHollowhellparadise_2.jpg",
    alt: "Gabimaru The-Hollow",
    name: "Gabimaru The-Hollow",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Gear5_2.jpg",
    alt: "Luffy Gear-5",
    name: "Luffy Gear-5",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Red",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/itachiUchiha_1.jpg",
    alt: "Itachi Uchiha",
    name: "Itachi Uchiha",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/kaiju-no-8-1.jpg",
    alt: "Kaiju No 8",
    name: "Kaiju No 8",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Luffy_Most_Wanted_1.jpg",
    alt: "Luffy Most Wanted",
    name: "Luffy Most Wanted",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Madara_2.jpg",
    alt: "Madara Uchiha",
    name: "Madara Uchiha",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/minato-yellow-flash.jpg",
    alt: "Minato The Yellow flash",
    name: "Minato The Yellow flash",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/naruto_Nine_Tails-1.jpg",
    alt: "Naruto & Nine-Tails",
    name: "Naruto & Nine-Tails",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/OraOra_1.jpg",
    alt: "Ora-Ora",
    name: "Ora-Ora",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Ronozoro_2.jpg",
    alt: "Ronozoro Onepiece",
    name: "Ronozoro Onepiece",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/Animehoodies/Ryomen_Sukuna_1.jpg",
    alt: "Ryomen Sukuna",
    name: "Ryomen Sukuna",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/endavour.png",
    alt: "Endeavour Half Sleeve",
    name: "Endeavour Half Sleeve",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/naruto shippuden.png",
    alt: "Naruto Shippuden Hoodie",
    name: "Naruto Shippuden Hoodie",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
  {
    img: "/logoandimages/anime.png",
    alt: "Samurai Hoodie",
    name: "Samurai Hoodie",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "@",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve : "Fullsleeve"
  },
];

const Animehoodies = () => {
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

export default Animehoodies;