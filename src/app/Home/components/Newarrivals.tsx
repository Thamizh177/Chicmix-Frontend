import React from "react";
import Image from "next/image";

const products = [
  {
    img: "/logoandimages/anime.png",
    alt: "Samurai Hoodie",
    name: "Samurai Hoodie",
    price: "Rs.999.0",
    oldPrice: "Rs.1500.0",
  },
  {
    img: "/logoandimages/naruto shippuden.png",
    alt: "Naruto Shippuden Hoodie",
    name: "Naruto Shippuden Hoodie",
    price: "Rs.999.0",
    oldPrice: "Rs.1500.0",
  },
  {
    img: "/logoandimages/team 7.png",
    alt: "Team 7 Full Sleeve",
    name: "Team 7 Full Sleeve",
    price: "Rs.999.0",
    oldPrice: "Rs.1500.0",
  },
  {
    img: "/logoandimages/endavour.png",
    alt: "Endeavour Half Sleeve",
    name: "Endeavour Half Sleeve",
    price: "Rs.999.0",
    oldPrice: "Rs.1500.0",
  },
  {
    img: "/logoandimages/ultra ego hoodie.png",
    alt: "Ultra Ego Hoodie",
    name: "Ultra Ego (VEGETA)",
    price: "Rs.999.0",
    oldPrice: "Rs.1500.0",
  },
];

const NewArrivals = () => {
  return (
    <section className="px-5 py-10">
      <h2 className="text-center font-pacifico text-3xl font-bold mb-6">
        New Arrivals
      </h2>

      {/* Horizontal Scrollable Grid */}
      <div className="w-screen overflow-x-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-white">
        <div className="grid grid-flow-col auto-cols-max gap-10 px-5 py-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative w-[260px] bg-transparent rounded-lg overflow-hidden text-center flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:z-10"
            >
              < img
                src={product.img}
                alt={product.alt}
                className=" w-[200px] h-[350px] w-full rounded-xl mb-3 object-cover"
              />
              <div className="p-3">
                <p className="font-pacifico text-lg">{product.name}</p>
                <p className="text-lg font-semibold">
                  {product.price}{" "}
                  <span className="line-through text-red-500 text-sm">
                    {product.oldPrice}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
