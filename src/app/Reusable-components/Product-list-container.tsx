import React from "react";
import Link from "next/link";

interface Product {
    product_id:  number;
    img: string;
    alt: string;
    name: string;
    link: string;
    price: number;
    oldPrice?: string;
    colour: string;
    size: string[];
    availability: string;
    sleeve:string;
    sizeOptions:string;
}

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <section className="mt-6 px-4 sm:mt-15 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
                {products.map((product, index) => (
                    <Link 
                        href={{
                                pathname: "/Productpage",
                                query: {
                                product_id: product.product_id,
                                name: product.name,
                                img: product.img,
                                price: product.price,
                                oldPrice: product.oldPrice,
                                colour: product.colour,
                                size: product.size,
                                sizeOptions: product.sizeOptions, 
                                availability: product.availability,
                                sleeve: product.sleeve,
                                },
                        }}  
                        key={index} 
                        className="relative p-4 w-full max-w-[300px] h-auto text-center rounded-lg bg-white transition-transform duration-300 hover:scale-105 scale-95 sm:scale-90 md:scale-100"
                    >
                        <div className="flex flex-col items-center">
                            <img 
                                src={product.img} 
                                alt={product.alt} 
                                className="w-full max-w-[400px] h-auto rounded-lg object-cover"
                            />
                            
                            <div className="mt-3 flex flex-col items-center text-lg font-medium">
                                <p className="sm:text-sm md:text-sm text-base ">{product.name}</p>
                                <p className="text-gray-800 sm:text-sm md:text-sm ">
                                   Rs.{product.price}{product.oldPrice && (
                                        <span className="text-red-500 text-sm line-through ml-2">{product.oldPrice}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
