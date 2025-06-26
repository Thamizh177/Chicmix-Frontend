"use client";

import React, { useEffect, useState } from "react";
import {
  fetchwishlistdata,
  fetchProducts,
  fetchProductImages,
  removeproductsfromwishlist
} from "@/app/lib/api";
import Cookies from "js-cookie";

interface WishlistItem {
  wishlist_items_id: number;
  product: number;
  added_at: string;
}

interface WishlistResponse {
  wishlist_id: number;
  user: number;
  created_at: string;
  updated_at: string;
  wishlist_items: WishlistItem[];
}

type ProductDetails = {
  id: number;
  product_name: string;
  price: string;
  old_price?: string;
  colour_name?: { colour_name: string }[];
  sleeve?: string;
  stock_status?: string;
};

type ProductImage = {
  product_image_url: string;
};

type DisplayWishlistItem = {
  id: string;
  productId: number; 
  name: string;
  price: string;
  oldPrice?: string;
  img: string;
  colour: string;
  sleeve: string;
};

const WishlistPage = () => {
  const [items, setItems] = useState<DisplayWishlistItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const token = Cookies.get("accessToken");
        console.log("🪙 Token from cookie:", token);
        if (!token) return;

        const wishlistData = (await fetchwishlistdata({}, token)) as WishlistResponse;

        const enrichedItems: DisplayWishlistItem[] = await Promise.all(
          wishlistData.wishlist_items.map(async (item) => {
            const productId = item.product;
            console.log("🔍 the product id in the wishlist is:", productId);
            // Fetch product details
            const productData = await fetchProducts({ product: productId }) as  ProductDetails[] ;
             const productDetails = Array.isArray(productData) ? productData[0] : undefined;

            // Fetch product image
            const imageData = await fetchProductImages({ product: productId }) as ProductImage[];
            const productImage = imageData?.[0]?.product_image_url || "Product Image Not Available";

            const colour = productDetails?.colour_name?.[0]?.colour_name ?? "N/A";

            console.log("✅ Wishlist ID:", item.wishlist_items_id);
            console.log("🖼️ Image:", productImage);
            console.log("📦 Product:", productDetails);
            console.log("product data:",productData)

            return {
              id: item.wishlist_items_id.toString(),
              productId: item.product,
              name: productDetails?.product_name || "Unknown Product",
              price: productDetails?.price || "0",
              oldPrice: productDetails?.old_price || "",
              img: productImage,
              colour,
              sleeve: productDetails?.sleeve || "—",
            };
          })
        );

        setItems(enrichedItems);
      } catch (error) {
        console.error("❌ Error loading wishlist:", error);
      }
    };

    loadWishlist();
  }, []);

const handleRemove = async (productId: number) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    setMessage("Please log in to modify your wishlist.");
    setMessageType("error");
    return;
  }

  try {
    // 🔥 The key part: match what the backend expects — { product: <productId> }
    const response = await removeproductsfromwishlist(
     { product: productId }, // 🧠 Backend expects "product" in request.data
      token
    );

    // ✅ Remove from local state
    setItems((curr) => curr.filter((item) => item.productId !== productId));
    setMessage("Removed from wishlist.");
    setMessageType("success");
  } catch (err: any) {
    console.error("Remove wishlist error:", err);
    setMessage(err?.error || "Failed to remove item.");
    setMessageType("error");
  }
};


  return (
    <div className="max-w-7xl mx-auto p-6">
      {message && (
        <div
          className={`mb-5 px-4 py-3 rounded-lg font-semibold text-center ${
            messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center font-bold mt-20">
          <p className="text-2xl text-gray-500">Your wishlist is currently empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="aspect-[3/4]">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="mt-1">Colour: {item.colour}</p>
                <p className="mt-2 font-bold">Rs. {item.price}</p>
                {item.oldPrice && (
                  <p className="text-sm text-red-500 line-through">{item.oldPrice}</p>
                )}
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
