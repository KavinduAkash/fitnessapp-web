import React from "react";
import Button from "@mui/material/Button";
import "../assets/styles/create-post-bar.css";
import PostAddIcon from '@mui/icons-material/PostAdd';

function CreatePostBar() {
    return(
        <div className={'create-post-bar'}>

            <div></div>
            <Button variant="contained"><PostAddIcon/>&nbsp;Create new post</Button>

        </div>
    )
}

export default CreatePostBar;