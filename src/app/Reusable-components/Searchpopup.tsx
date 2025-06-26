"use client";
import { useState, useRef, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { fetchProducts } from "@/app/lib/api";
import Link from "next/link";
import Image from "next/image";

// Define the expected structure of the API response
interface ProductImage {
  product_image: number;
  product: number;
  product_image_url: string;
  product_name: string;
}

interface Product {
  product: number;
  product_name: string;
  product_image: ProductImage[];
  price: number;
  oldPrice?: string;
  colour_name: string;
  size_name: string[];
  availability: string;
  sleeve: string;
}

export default function SearchOverlay() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setShowSearch(false);
        setQuery("");
        setResults([]);
      }
    };
    if (showSearch) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setQuery("");
        setResults([]);
      }
    };
    if (showSearch) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 1) {
        fetchProducts({ q: query })
          .then((data) => setResults((data as Product[]) ?? []))
          .catch((err) => console.error("Search failed:", err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setShowSearch(true)}
        className="text-gray-700 hover:text-black"
      >
        <FcSearch className="text-3xl" />
      </button>

      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 backdrop-blur-md bg-black/30">
          <div
            ref={overlayRef}
            className="relative bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-xl shadow-2xl p-4 sm:p-6"
          >
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-3 right-3 text-xl sm:text-2xl text-gray-500 hover:text-black"
            >
              <IoClose />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              What are you looking for?
            </h2>

            <div className="relative mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <FcSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl sm:text-xl" />
            </div>

            {/* Search Results */}
            {results.length > 0 && (
              <ul className="space-y-2 max-h-80 overflow-y-auto">
                {results.map((item) => (
                  <li key={item.product}>
                      <Link
                        href={{
                          pathname: "/Productpage",
                          query: {
                            img: item.product_image?.[0]?.product_image_url || "/placeholder.jpg",
                            alt: item.product_name,
                            name: item.product_name,
                            price: item.price,
                            oldPrice: item.oldPrice,
                            colour: Array.isArray(item.colour_name)
                              ? item.colour_name.map((c: any) => c.colour_name).join(", ")
                              : item.colour_name,
                            size: Array.isArray(item.size_name)
                              ? item.size_name.map((s: any) => s.size_name).join(", ")
                              : item.size_name,
                            availability: item.availability,
                            sleeve: item.sleeve,
                          },
                        }}
                        className="flex gap-4 items-center p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setShowSearch(false)}
                      >
                      <Image
                        src={item.product_image?.[0]?.product_image_url || "/placeholder.jpg"}
                        alt={item.product_name}
                        width={48}
                        height={48}
                        className="rounded object-cover"
                      />
                      <span className="text-sm font-medium">
                        {item.product_name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
