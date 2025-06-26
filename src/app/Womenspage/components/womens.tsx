import React from "react";
import Productcontainer from "@/app/Reusable-components/container";

const products = [
    { 
        img: "/logoandimages/women catagory/women full sleeve.jpeg", 
        alt: "Full Sleeve T-shirts", 
        name: "Full Sleeve T-shirts",
        link:""
       },
    { 
        img: "/logoandimages/women catagory/womens hoodies.jpg", 
        alt: "Hoodies", 
        name: "Hoodies",
        link:""
       },
    { 
        img: "/logoandimages/women catagory/women oversized tshirt.jpeg", 
        alt: "Oversized T-shirts", 
        name: "Oversized T-shirts",
        link:""
      },
    { 
        img: "/logoandimages/women catagory/women half sleeve.jpg", 
        alt: "Half Sleeve T-shirts", 
        name: "Half Sleeve T-shirts",
        link:""
      },
    { 
        img: "/logoandimages/women catagory/women half sleeve.jpg", 
        alt: "Plain T-shirt", 
        name: "Plain T-shirt",
        link:""
      },
    { 
        img: "/logoandimages/women catagory/womens sports wear.jpeg", 
        alt: "Sports Wear", 
        name: "Sports Wear",
        link:""
      },
  ];



const WomensCategories = () => {
    return (
      <section className="p-5">
        < Productcontainer title="" products={products}/>
      </section>
    );
};

export default WomensCategories;
