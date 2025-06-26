import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black text-center py-6 mt-25 ">
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 place-items-center h-[20vh]">
        
        {/* Navigation Links */}
        <div className="flex gap-6 text-lg">
          <Link href="/Home" className="hover:text-crimson">Home</Link>
          <Link href="/shop" className="hover:text-crimson">Shop</Link>
          <Link href="/about" className="hover:text-crimson">About</Link>
          <Link href="/contact" className="hover:text-crimson">Contact</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-2xl">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="hover:text-crimson" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="hover:text-crimson" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="hover:text-crimson" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="hover:text-crimson" />
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-sm mt-4">&copy; 2025 ChicMix. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
