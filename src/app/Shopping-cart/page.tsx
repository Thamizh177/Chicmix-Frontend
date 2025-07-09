import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import  Cartpage from "@/app/Shopping-cart/components/cart"
import Header from "@/app/Home/components/Header";

function shoppingcart () {
    return (
        <>
            <Header/>
            <Cartpage/>
            
        </>
    )
}

export default shoppingcart;