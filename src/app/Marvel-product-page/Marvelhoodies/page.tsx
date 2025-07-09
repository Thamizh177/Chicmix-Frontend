import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import MarvelHoodies from "@/app/Marvel-product-page/Marvelhoodies/components/Marvelhoodies";
import Header from "@/app/Home/components/Header"


function marvelhoodies (){
    return (
        <>
        <Header/>
        <MarvelHoodies/>
        
        </>
    )
}

export default marvelhoodies;