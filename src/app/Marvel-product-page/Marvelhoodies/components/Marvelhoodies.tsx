"use client";
import React, { useState } from "react";
import ProductGrid from '@/app/Reusable-components/Product-list-container';
import ParentComponent from '@/app/Reusable-components/Filter';

const products = [
  {
    img: "/logoandimages/Marvelhoodies/deadpool-emblem-hoodie.jpg",
    alt: "Dead Pool Emblem",
    name: "Dead Pool Emblem",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Red",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-avengers-character-logos-hoodie.jpg",
    alt: "Marvel logo",
    name: "Marvel logo",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Grey",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"

  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-black-panther-suit-hoodie.jpg",
    alt: "Black Panther",
    name: "Black Panther",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-captain-america-mechanical-shield-sweatshirt.jpg",
    alt: "Captain America",
    name: "Captain America",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-captain-america-worthy-hoodie.jpg",
    alt: "Captain America : Worthy",
    name: "Captain America : Worthy",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-iron-man-arc-reactor-sweatshirt.jpg",
    alt: "Ironman: Arc Reactor",
    name: "Ironman: Arc Reactor",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-iron-man-stark-industries-blueprint-hoodie.jpg",
    alt: "Stark Industries",
    name: "Stark Industries",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-loki-master-of-mischief-hoodie.jpg",
    alt: "Loki: God of Multiverse",
    name: "Loki: God of Multiverse",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-loki-tva-variant-hoodie.jpg",
    alt: "TVA Varient",
    name: "TVA Varient",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-miles-morales-urban-hoodie.jpg",
    alt: "Miles Morals",
    name: "Miles Morals",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-spider-gwen-stacy-hoodie.jpg",
    alt: "Gwen Stacy",
    name: "Gwen Stacy",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-spider-man-logo-hoodie.jpg",
    alt: "Amazinng Spiderman",
    name: "Amazinng Spiderman",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Red",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-the-punisher-skull-hoodie.jpg",
    alt: "Punisher Skull",
    name: "Punisher Skull",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/marvel-upgraded-spider-suit-hoodie.jpg",
    alt: "Marvel: Upgraded spider suit",
    name: "Marvel: Upgraded spider suit",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Red",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/new-mask-same-task-hoodie.jpg",
    alt: "Doctor Doom",
    name: "Doctor Doom",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marvelhoodies/men-s-black-venomized-graphic-printed-oversized-hoodies.jpg",
    alt: "Marvel: Venom",
    name: "Marvel: Venom",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
];

const MarvelHoodies = () => {
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

export default MarvelHoodies;