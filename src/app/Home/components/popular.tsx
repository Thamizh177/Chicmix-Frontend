"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Import Link for routing
import { fetchPopularCategories } from "@/app/lib/api";

type Category = {
  popular_catagories_name: string;
  popular_catagories_image: string;
  navigation_link : string; // ✅ Your new field from the DB
};

const Popular = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchPopularCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <section className="mt-8 mb-4 text-center">
      <h2 className="text-3xl font-bold">Popular Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-20 mt-15 place-items-center">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.navigation_link}
            className="w-4/5 overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-110 block"
          >
            <img
              src={category.popular_catagories_image}
              alt={`${category.popular_catagories_name} category`}
              className="w-full h-[300px] object-cover rounded-2xl"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Popular;

