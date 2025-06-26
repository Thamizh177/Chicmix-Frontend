import React from "react";
import MenCategories from "@/app/Menspage/components/mens"
import SubHeader from "../Reusable-components/subheader";
import Footer from "../Reusable-components/footer";
import Header from "@/app/Home/components/Header"

function Menspage() {
    return(
        <>
            <Header/>
            <MenCategories/>
            <Footer/>
        </>
    )
}

export default Menspage;