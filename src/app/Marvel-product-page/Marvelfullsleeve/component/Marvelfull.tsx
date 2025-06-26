"use client";
import React, { useState } from "react";
import ProductGrid from '@/app/Reusable-components/Product-list-container';
import ParentComponent from '@/app/Reusable-components/Filter';

const products = [
  {
    img: "/logoandimages/Marvelfullsleeve/black_panther_the_warrior.jpg",
    alt: "Black Panther: The Warrior",
    name: "Black Panther: The Warrior",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/captain-america-mechanical-shield.jpg",
    alt: "Captain America Shiled",
    name: "Captain America Shiled",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"

  },
  {
    img: "/logoandimages/Marvelfullsleeve/gostrider.jpg",
    alt: "Gost Rider",
    name: "Gost Rider",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/Incredable_hulk.jpg",
    alt: "Incredable Hulk",
    name: "Incredable Hulk",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Orange,Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/kang_hewhoremains.jpg",
    alt: "Kang: He Who Remains",
    name: "Kang: He Who Remains",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/marvel-deadpool-emblem.jpg",
    alt: "Marvel DeadPool",
    name: "Marvel DeadPool",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/marvel-iron-man-arc-reactor-light-up.jpg",
    alt: "Iron-Man Arc Reactor",
    name: "Iron-Man Arc Reactor",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/Marvel-logo.jpg",
    alt: "Marvel Emblem",
    name: "Marvel Emblem",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/marvel-spider-man.jpg",
    alt: "Marvel Spiderman",
    name: "Marvel Spiderman",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Red",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/punisher_cahos.jpg",
    alt: "Punisher Chaos",
    name: "Punisher Chaos",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/spider-man.webp",
    alt: "Spider-Man",
    name: "Spider-Man",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/super_soldier.jpg",
    alt: "Marvel Super Soldier",
    name: "Marvel Super Soldier",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/Thor.jpg",
    alt: "Avengers: Thor",
    name: "Avengers: Thor",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/venom-1.jpg",
    alt: "Venom",
    name: "Venom",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/wankanda_forever.jpg",
    alt: "Black Panther:Wankanda Forever",
    name: "Black Panther:Wankanda Forever",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelfullsleeve/we_are_deadpool.jpg",
    alt: "We are Deadpool",
    name: "We are Deadpool",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
];

const Marvelfull = () => {
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

export default Marvelfull;