import React from "react";
import Header from "../components/header.jsx";
import {Button} from "@mui/material";

function Home() {
    return (
        <div>
            <Header/>
            <Button variant="contained">Click</Button>
        </div>
    );
}

export default Home;