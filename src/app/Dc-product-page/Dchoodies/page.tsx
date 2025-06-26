import React from "react";
import SubHeader from "@/app/Reusable-components/subheader";
import Footer from "@/app/Reusable-components/footer";
import Dchoodies from "@/app/Dc-product-page/Dchoodies/component/Dchoodies";
import Header from "@/app/Home/components/Header"


function Dchoodie (){
    return (
        <>
        <Header/>
        <Dchoodies/>
        <Footer/>
        </>
    )
}

export default Dchoodie;