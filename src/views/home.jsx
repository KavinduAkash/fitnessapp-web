import React from "react";
import Header from "../components/header.jsx";
import "../assets/styles/home.css";
import HomePostCard from "../components/home-post-card.jsx";

function Home() {
    return (
        <div>
            <Header/>
            <section className={'home-content'}>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
            </section>
        </div>
    );
}

export default Home;