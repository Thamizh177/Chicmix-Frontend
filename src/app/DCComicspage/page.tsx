import React from "react";
import SubHeader from "../Reusable-components/subheader";
import DcComics from "@/app/DCComicspage/components/dc";
import Footer from "../Reusable-components/footer";
import Header from "@/app/Home/components/Header"

function dcpage (){
    return (
        <>
        <Header/>
        <DcComics/>
        <Footer/>
        </>
    )
}

export default dcpage;