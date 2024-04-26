import React from "react";
import Header from "../components/header.jsx";
import "../assets/styles/home.css";
import HomePostCard from "../components/home-post-card.jsx";
import CreatePostBar from "../components/create-post-bar.jsx";

function Home() {
    return (
        <div>
            <Header/>
            <section className={'home-content'}>

                <CreatePostBar/>

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