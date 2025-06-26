"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts, fetchProductImages } from "@/app/lib/api";
import ProductGrid from "@/app/Reusable-components/Product-list-container";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      try {
        const [rawProducts, rawImages] = await Promise.all([
          fetchProducts({ q: query }),
          fetchProductImages({ q: query }),
        ]);

        const imageMap: Record<number, string> = {};
        (Array.isArray(rawImages) ? rawImages : []).forEach((img: any) => {
          if (!imageMap[img.product]) {
            imageMap[img.product] = img.product_image_url;
          }
        });

        const formatted = Array.isArray(rawProducts)
          ? rawProducts.map((p: any) => ({
              img: imageMap[p.product] || "/placeholder.jpg",
              alt: p.product_name,
              name: p.product_name,
              link: "/Productpage",
              price: parseFloat(p.price),
              oldPrice: `Rs.${p.old_price}`,
              colour: Array.isArray(p.colour_name)
                ? p.colour_name.map((c: any) => c.colour_name)
                : [],
              size: Array.isArray(p.size_name)
                ? p.size_name.map((s: any) => s.size_name)
                : [],
              availability:
                p.stock_status === "in_stock" ? "In stock" : "Out of stock",
              sleeve: p.sleeve || "Fullsleeve",
            }))
          : [];

        setProducts(formatted);
      } catch (error) {
        console.error("Search result loading failed:", error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>
      <ProductGrid products={products} />
    </div>
  );
}
