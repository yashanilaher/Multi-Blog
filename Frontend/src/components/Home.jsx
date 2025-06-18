import React from "react"
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Coding from "../Home/Coding";
import Creator from "../Home/Creator";
import Entertainment from "../Home/Entertainment";
import Sports from "../Home/Sports";
import Business from "../Home/Business";

const Home=()=>{
    return (
        <div>
            <Hero/>
            <Trending/>
            <Devotional/>
            <Coding/>
            <Entertainment/>
            <Sports/>
            <Business/>
            <Creator/>
        </div>
    )
}

export default Home;



