"use client";
import React, { useState } from "react";
import ProductGrid from '@/app/Reusable-components/Product-list-container';
import ParentComponent from '@/app/Reusable-components/Filter';

const products = [
  {
    img: "/logoandimages/Marveloversized/black_panther.jpg",
    alt: "Black panther",
    name: "Black panther",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/deadpool-merc-with-a-mouth-oversized.jpg",
    alt: "DeadPool",
    name: "DeadPool",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Red",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"

  },
  {
    img: "/logoandimages/Marveloversized/doctordoom.jpg",
    alt: "Doctor Doom",
    name: "Doctor Doom",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/doctorstrange.jpg",
    alt: "Doctor Strange",
    name: "Doctor Strange",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/hulk_smash.jpg",
    alt: "Hulk Samash",
    name: "Hulk Samash",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/Incridele_hulk.jpg",
    alt: "Incredable Hulk",
    name: "Incredable Hulk",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Green",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel_buddies.jpg",
    alt: "Marvel Buddies",
    name: "Marvel Buddies",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Beige",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel_universe.jpg",
    alt: "Marvel Universe",
    name: "Marvel Universe",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"White",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel_venom.jpg",
    alt: "Marvel: venom",
    name: "Marvel: venom",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel-spiderman-miles-morales-urban-oversized.jpg",
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
    img: "/logoandimages/Marveloversized/marvel-black-panther-desi-truck-art-oversized.jpg",
    alt: "Black Panther:Desi Truck Art",
    name: "Black Panther:Desi Truck Art",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l","xl"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel-black-panther-urban-logo-oversized.jpg",
    alt: "Black Panther:Logo",
    name: "Black Panther:Logo",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel-invincible-iron-man-desi-truck.jpg",
    alt: "Ironman:Desi Truck Art",
    name: "Ironman:Desi Truck Art",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Black",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel-the-despicable-deapool-oversized.jpg",
    alt: "Marvel: DeadPool",
    name: "Marvel: DeadPool",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Biege",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/marvel-wolverine-violent-mutant-oversized.jpg",
    alt: "Wolverine:Mutant",
    name: "Wolverine:Mutant",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Grey",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/punisher-skull.jpg",
    alt: "Marvel: Punisher Skull",
    name: "Marvel: Punisher Skull",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Grey",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/wolverine.jpg",
    alt: "Marvel: Wolverine",
    name: "Marvel: Wolverine",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Blue",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"
  },
  {
    img: "/logoandimages/Marveloversized/wankanda_tribe.jpg",
    alt: "Marvel: Wakanda Tribe",
    name: "Marvel: Wakanda Tribe",
    price: 999.0,
    oldPrice: "Rs.1500.0",
    link: "",
    colour:"Purple",
    size: ["s", "m", "l"],
    availability : "In stock",
    sleeve:"Full SLeeve"

  },
];

const Marveloversized = () => {
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

export default Marveloversized;