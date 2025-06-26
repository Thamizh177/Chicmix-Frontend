import React from "react";
import Productcontainer from "@/app/Reusable-components/container";

const products = [
  { 
    img: "/logoandimages/Mencatagories/fullsleeve.jpg", 
    alt: "Full Sleeve T-shirts", 
    name: "Full Sleeve T-shirts",
    link:"" 
  },
  { 
    img: "/logoandimages/Mencatagories/hoodies.jpg", 
    alt: "Hoodies", 
    name: "Hoodies",
    link:""
  },
  { 
    img: "/logoandimages/Mencatagories/oversized.jpg", 
    alt: "Oversized T-shirts", 
    name: "Oversized T-shirts",
    link:""
  },
  { 
    img: "/logoandimages/Mencatagories/halfsleeve2.jpg", 
    alt: "Half Sleeve T-shirts", 
    name: "Half Sleeve T-shirts",
    link:""
  },
  { 
    img: "/logoandimages/Mencatagories/halfsleeve.jpg", 
    alt: "Plain T-shirt", 
    name: "Plain T-shirt",
    link:""
  },
  {
    img:"/logoandimages/Mencatagories/sport.jpg",
    alt:"Sports Wear",
    name:"Sports Wear",
    link:""
  }
];

const MenCategories = () => {
  return (
    <section className="p-5">
      < Productcontainer title="" products ={products}/>
    </section>
  );
};

export default MenCategories;
