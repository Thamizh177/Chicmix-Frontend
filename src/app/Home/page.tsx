import React from "react";
import Header from "./components/Header"; // Import Header Component
import Banner from "./components/Banner";
import NewArrivals from "./components/Newarrivals"
import MenCategories from "./components/Mens"
import WomensCategories from "./components/Womens"
import Footer from "../Reusable-components/footer";
import Popular from "./components/popular";

const HomePage = () => {
    return (
        <>
            <Header/>
            <Banner/>
            <NewArrivals/>
            <MenCategories/>
            <WomensCategories/>
            <Popular/>
            <Footer/>
            {/* Other homepage components */}
        </>
    );
};

export default HomePage;
