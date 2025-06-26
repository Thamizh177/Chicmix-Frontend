"use client"

import React, { useEffect, useState } from "react";
import Productcontainer from "@/app/Reusable-components/container";
import { fetchSubcategories } from "@/app/lib/api"; // adjust path as needed

// 1. Type for individual UI card
type ProductCard = {
  img: string;
  alt: string;
  name: string;
  link: string;
};

// 2. API data type (from backend)
type Subcategory = {
  sub_catagory_thumbnail: string;
  name: string;
};

const WomenCategories = () => {
  // 3. Strongly type your state
  const [subcategories, setSubcategories] = useState<ProductCard[]>([]);

  // 4. Load data on mount
  useEffect(() => {
    const loadSubcategories = async () => {
      try {
        const data: Subcategory[] = await fetchSubcategories({ catagory: 2 });
        const formatted: ProductCard[] = data.map((item) => ({
          img: item.sub_catagory_thumbnail,
          alt: item.name,
          name: item.name,
          link: "", // Add dynamic route later if needed
        }));
        setSubcategories(formatted);
      } catch (error) {
        console.error("Failed to load subcategories:", error);
      }
    };

    loadSubcategories();
  }, []);

  return (
    <section className="p-5">
      <Productcontainer title="Women Categories" products={subcategories} />
    </section>
  );
};

export default WomenCategories;
