import React from "react";
import Button from "@mui/material/Button";
import "../assets/styles/create-post-bar.css";
import PostAddIcon from '@mui/icons-material/PostAdd';

function CreateMealBar(props) {
    return(
        <div className={'create-post-bar'}>

            <div></div>
            <Button variant="contained" onClick={props.update}><PostAddIcon/>&nbsp;Create new meal</Button>

        </div>
    )
}

export default CreateMealBar;