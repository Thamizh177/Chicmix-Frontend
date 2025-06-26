import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import Marvelfull from "@/app/Marvel-product-page/Marvelfullsleeve/component/Marvelfull";
import Header from "@/app/Home/components/Header"


function Marvelfullsleeve (){
    return (
        <>
        <Header/>
        <Marvelfull/>
        <Footer/>
        </>
    )
}

export default Marvelfullsleeve;