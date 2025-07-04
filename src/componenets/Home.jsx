import React from "react";
import Header from "./Header";
import Hero from "./Hero.jsx";
import Carousel from "./Carousel.jsx";
import Recentnovels from "./Recentnovels.jsx";
import Footercomponent from './Footercomponent.jsx';
import '../css/Home.css';
function Home(){
    return(
        <>
        <Header></Header>
        <div className="home-body">
        <Hero></Hero>
        <Carousel></Carousel>
        <Recentnovels></Recentnovels>
        <Footercomponent />
        </div>
        </>
    )
}
export default Home;