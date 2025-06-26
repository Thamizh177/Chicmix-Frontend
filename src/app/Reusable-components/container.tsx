import React from "react";
import Link from "next/link"; // Import Link from Next.js

// Define the type for each product
interface Product {
  img: string;
  alt: string;
  name: string;
  link: string; // Add a link property
}

// Props for the reusable component
interface ProductcontainerProps {
  title: string;
  products: Product[];
}

const Productcontainer: React.FC<ProductcontainerProps> = ({ title, products }) => {
  return (
    <section className="p-5">
      {/* Dynamic Heading */}
      <h2 className="text-center text-3xl font-bold">{title}</h2>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 justify-items-center">
        {products.map((product, index) => (
          <Link key={index} href={product.link}>
            <div className="relative w-full max-w-[300px] p-5 text-center rounded-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
              {/* Product Image */}
              <img
                src={product.img}
                alt={product.alt}
                className="w-full max-w-[500px] h-auto rounded-xl mb-3 object-cover"
              />

              {/* Product Name */}
              <p className="sm:text-sm lg:text-2xl font-semibold">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Productcontainer;
