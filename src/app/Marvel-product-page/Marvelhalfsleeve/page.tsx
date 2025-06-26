import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import Marvelhalfsleeve from "@/app/Marvel-product-page/Marvelhalfsleeve/components/Marvelhalf";
import Header from "@/app/Home/components/Header"


function marvelhalfsleeve (){
    return (
        <>
        <Header/>
        <Marvelhalfsleeve/>
        <Footer/>
        </>
    )
}

export default marvelhalfsleeve;