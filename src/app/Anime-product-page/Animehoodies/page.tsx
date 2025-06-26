import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import Animehoodies from "@/app/Anime-product-page/Animehoodies/components/Animehoodies";
import Header from "@/app/Home/components/Header"

function Animefull (){
    return (
        <>
        <Header/>
        <Animehoodies/>
        <Footer/>
        </>
    )
}

export default Animefull;