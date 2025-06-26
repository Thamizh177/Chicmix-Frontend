import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import Wishlistpage from "./component/mywishlist";
import Header from "@/app/Home/components/Header";

function shoppingwishlist () {
    return (
        <>
            <Header/>
            <Wishlistpage/>
            <Footer/>
        </>
    )
}

export default shoppingwishlist