"use client";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import Link from "next/link";
import { Honk } from "next/font/google";
import SearchBar from "@/app/Reusable-components/Searchpopup";
import ProfileDropdownWithLogin from "@/app/Reusable-components/Profiledropdown";
import Cookies from "js-cookie";
import { fetchcart,fetchwishlistdata } from "@/app/lib/api";


const honk = Honk({
  subsets: ['latin'],
  weight: ['400'],
});

// ✅ Updated nav items with proper paths
const navItems = [
  { name: "Anime", path: "/Animepage" },
  { name: "Marvel", path: "/Marvelpage" },
  { name: "DC Comics", path: "/DCComicspage" },
  { name: "Customize", path: "/Customizepage" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [cartcount, setCartcount] = useState(0);
  const [wishlistcount, setWishlistcount] = useState(0);

  // Function to update cart count from API
  const updateCartCount = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const cartData = await fetchcart({}, token);
      setCartcount(cartData?.items?.length || 0);
    } catch (error) {
      console.error("❌ Failed to fetch cart count:", error);
      setCartcount(0);
    }
  };

  // Function to update wishlist count from API
  const updateWishlistCount = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const wishlistData = await fetchwishlistdata({}, token);
      setWishlistcount(wishlistData?.wishlist_items?.length || 0);
    } catch (error) {
      console.error("❌ Failed to fetch wishlist count:", error);
      setWishlistcount(0);
    }
  };

  // Initial fetch + listen for global update trigger
  useEffect(() => {
    updateCartCount();
    updateWishlistCount();

    const handleCountUpdate = () => {
      updateCartCount();
      updateWishlistCount();
    };

    window.addEventListener("updateCounts", handleCountUpdate);
    return () => {
      window.removeEventListener("updateCounts", handleCountUpdate);
    };
  }, []);


  return (
    <div className="w-full h-18 lg:h-22 bg-gray-300 lg:rounded-t-lg sm:h-15">
      <div className="hidden lg:flex max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className={`${honk.className} text-5xl`}>CHICMIX</h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-2 ">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="text-xl text-black px-4 py-2 font-bold rounded-md hover:underline hover:underline-offset-10 hover:decoration-purple-700 hover:decoration-3 cursor-pointer"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>



        {/* Desktop Icons (Cart, Wishlist, Search) */}
        <div className="hidden lg:flex gap-4 items-center">

          <div className="relative mt-3">
            <SearchBar />
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <Link href="/Shopping-cart">
              <FaShoppingCart style={{ color: 'blue' }} className="text-2xl" />
              <span className="w-4 h-4 bg-purple-400 text-black font-bold rounded-full absolute left-1 -bottom-4 text-xs flex items-center justify-center">
                {cartcount}
              </span>
            </Link>
          </div>

          {/* Wishlist Icon */}
          <div className="relative mr-5">
            <Link href="/Wishlist-page">
              <FaHeart style={{ color: 'red' }} className="text-2xl" />
              <span className="w-4 h-4 bg-purple-400 text-black font-bold rounded-full absolute left-1 -bottom-4 text-xs flex items-center justify-center">
                {wishlistcount}
              </span>
            </Link>
          </div>

          <div className="relative">
              <ProfileDropdownWithLogin />
          </div>
        </div>
      </div>





        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex flex-cols items-center justify-between h-full gap">
          <div className="flex flex-cols gap-2">
            <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl " />}
            </button>

            <div className="relative mt-3">
              <SearchBar />
            </div>
          </div>



          <div>
            <h1 className={`${honk.className} text-3xl`}>CHICMIX</h1>
          </div>
          



            <div className="flex flex-cols gap-4 items-center">
              {/* Cart */}
              <div className="relative">
                <Link href="/Shopping-cart">
                  <FaShoppingCart style={{ color: '#0F52BA' }} className="text-xl mt-1" />
                  <span className="w-4 h-4 bg-white text-black rounded-full absolute -top-2 -right-2 text-xs flex items-center justify-center">
                    {cartcount}
                  </span>
                </Link>
              </div>

              {/* Wishlist */}
              <div className="relative">
                <Link href="/Wishlist-page">
                  <FaHeart style={{ color: 'hotpink' }} className="text-xl mt-1" />
                  <span className="w-4 h-4 bg-white text-black font-bold rounded-full absolute -top-2 -right-2 text-xs flex items-center justify-center">
                    {wishlistcount}
                  </span>
                </Link>
              </div>

              <div className="relative">
                    <ProfileDropdownWithLogin />
              </div>
            </div>



        </div>
      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full z-40 bg-gray-300 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* Close Button */}
        <div className="p-5 flex justify-end ml-5">
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <FiX className="text-3xl" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <ul className="flex flex-col items-center gap-6 mt-10">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="text-xl text-black px-4 py-2 font-bold rounded-md hover:underline hover:underline-offset-10 hover:decoration-purple-700 hover:decoration-3 cursor-pointer"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
