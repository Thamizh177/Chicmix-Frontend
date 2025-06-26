"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "@/app/Reusable-components/Product-list-container";
import FilterSidebar from "@/app/Reusable-components/Filter";
import { fetchProducts, fetchProductImages } from "@/app/lib/api";
import SizeChartModal from "@/app/Reusable-components/sizechart";

const Animefullsleeve = () => {
  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [products, setProducts] = useState<any[]>([]);
  

  const buildParams = () => {
    const params: any = { sub_catagory: 13 };
    if (color) params.colour_name = color;
    if (size) params.size_name = size;
    if (availability) {
      params.stock_status = availability === "In stock" ? "in_stock" : "out_of_stock";
    }
    if (priceMax !== undefined) {
      params.max_price = priceMax;
    }
    return params;
  };

useEffect(() => {
  const load = async () => {
    try {
      const filterParams = buildParams();
      console.log("Fetching with filters:", filterParams); // ✅ Add here

      const [rawProducts, rawImages] = await Promise.all([
        fetchProducts(filterParams),
        fetchProductImages(filterParams),
      ]);
      console.log("Raw products:", rawProducts);
      console.log("Raw images:", rawImages);
      console.log(await fetchProducts({ sub_catagory: 13 }));
      console.log(await fetchProducts({ sub_catagory: 13, colour_name: "Black" }));

      const imageArray: any[] = Array.isArray(rawImages) ? rawImages : [];

      const imageMap: Record<number, string> = {};
      imageArray.forEach((img: any) => {
        if (!imageMap[img.product]) {
          imageMap[img.product] = img.product_image_url;
        }
      });

      const formatted = Array.isArray(rawProducts)
        ? rawProducts.map((p: any) => {
            const sizeOptions = p.size_name?.map((s: any) => ({
              id: Number(s.size),
              label: s.size_name
            })) || [];

            console.log("👉 Size Options for product", p.product_name, sizeOptions); // 👈 Logs here

            return {
              product_id: p.product,
              img: imageMap[p.product] || "",
              alt: p.product_name,
              name: p.product_name,
              link: "/Productpage",
              price: parseFloat(p.price),
              oldPrice: `Rs.${p.old_price}`,
              colour: (p.colour_name?.map((c: any) => c.colour_name).join(",") || ""),
              sizeOptions: encodeURIComponent(JSON.stringify(p.sizeOptions)), // 👈 This is what goes to Product page
              availability: p.stock_status === "in_stock" ? "In stock" : "Out of stock",
              sleeve: "Fullsleeve",
            };
          })
        : [];

      setProducts(formatted);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };
 
  load();
}, [color, size, availability, priceMax]);



  return (
    <div className="flex gap-5">
      <FilterSidebar
        onColorSelect={setColor}
        onSizeSelect={setSize}
        onAvailabilitySelect={setAvailability}
        onPriceChange={setPriceMax}
      />
      <ProductGrid products={products} />
    </div>
  );
};

export default Animefullsleeve;
