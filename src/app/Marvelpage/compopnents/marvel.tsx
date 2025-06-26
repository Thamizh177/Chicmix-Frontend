import Link from 'next/link';
import Productcontainer from '@/app/Reusable-components/container';

const products = [
    { 
        img: "/logoandimages/marvel catagory/marvel full.jpg", 
        alt: "Full Sleeve T-shirts", 
        name: "Full Sleeve T-shirts",
        link: "/Marvel-product-page/Marvelfullsleeve" // Add the navigation link 
     },
    { 
        img: "/logoandimages/marvel catagory/marvel hoodie.jpg", 
        alt: "Hoodies", 
        name: "Hoodies",
        link: "/Marvel-product-page/Marvelhoodies" // Add the navigation link 
     },
    { 
        img: "/logoandimages/marvel catagory/marvel oversized.jpg", 
        alt: "Oversized T-shirts", 
        name: "Oversized T-shirts",
        link: "/Marvel-product-page/Marveloversized" // Add the navigation link 
    },
    { 
        img: "/logoandimages/marvel catagory/marvel half.jpg", 
        alt: "Half Sleeve T-shirts", 
        name: "Half Sleeve T-shirts",
        link: "/Marvel-product-page/Marvelhalfsleeve" // Add the navigation link 
     },

  ];

const Marvel = () => {
    return (
    <section className="p-5">
      <Productcontainer title="" products={products}/>
    </section>
    );
};

export default Marvel;
