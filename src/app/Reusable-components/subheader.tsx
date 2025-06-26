"use client";
import React, { useState,useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { ImCart } from "react-icons/im";
import { FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

interface SubHeaderprops{
    title: string;
}

const SubHeader:React.FC<SubHeaderprops> = ({title}) => {
  const [isOpen, setIsOpen] = useState(false);

  
    const [cartcount,setcartcount] = useState(0);
     useEffect(() => {
      const cartdata = localStorage.getItem("cart");
      if (cartdata){
        const parsedcart = JSON.parse(cartdata);
        setcartcount(parsedcart.length);
      }
     },[]);

     const [wishlistcount,setwishlistcount] = useState(0);
     useEffect(() => 
      {
          const wishlistdata = localStorage.getItem("wishlist");
          if (wishlistdata){
          const prasedwishlist = JSON.parse(wishlistdata);
          setwishlistcount(prasedwishlist.length)
          }
  
      },[]);
  
  return (
    <div className="w-full h-20 lg:h-28 text-black bg-gray-300 lg:rounded-t-lg">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        {/* Heading subheader */}
        <h1 className="sm:text-xl lg:text-2xl font-bold">{title}</h1>

        {/* Desktop Menu */}

        {/* Desktop Icons (Cart, Wishlist, Search) */}
        <div className="hidden lg:flex gap-8 items-center">
          {/* Search Bar */}
          <div className="relative group hidden mt-2 sm:block">
            <input
              type="text"
              placeholder="Search"
              className="w-[200px] sm:w-[200px] group-hover:w-[220px] transition-all duration-300 rounded-full border-3 border-black px-2 py-1 focus:outline-none"
            />
            <IoSearch className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3" />
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <Link href="/Shopping-cart">
              <span className="w-4 h-4 bg-purple-500 text-black font-bold rounded-full absolute left-1 -bottom-4 text-xs flex items-center justify-center">
                {cartcount}
              </span>
              <MdOutlineShoppingCart className="text-2xl" />
            </Link>
          </div>

          {/* Wishlist Icon */}
          <div className="relative">
              <Link href="/Wishlist-page">
                <FaRegHeart className="text-xl" />
                <span className="w-4 h-4 bg-purple-500 text-black font-bold rounded-full absolute left-1 -bottom-4 text-xs flex items-center justify-center">
                  {wishlistcount}
                </span>
              </Link>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden ">
          <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full z-50 bg-gray-300 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="p-5 flex justify-end ml-5">
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <FiX className="text-3xl" />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="flex flex-col items-center mt-6 px-6">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full border-2 border-black px-3 py-2 focus:outline-none"
            />
            <IoSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
          </div>
        </div>

        {/* Mobile Icons (Cart & Wishlist) */}
        <div className="flex justify-center gap-6 mt-6">
          {/* Cart */}
          <div className="relative">
              <Link href="/Shopping-cart">
                <MdOutlineShoppingCart className="text-2xl" />
                <span className="w-5 h-5 bg-purple-600 text-black font-bold rounded-full absolute -top-2 -right-2 text-xs flex items-center justify-center">
                  {cartcount}
                </span>
              </Link>
          </div>

          {/* Wishlist */}
          <div className="relative">
            <Link href="/Wishlist-page">
                <FaRegHeart className="text-2xl" />
                <span className="w-5 h-5 bg-purple-600 text-black rounded-full font-bold absolute -top-2 -right-3 text-xs flex items-center justify-center">
                  {wishlistcount}
                </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
