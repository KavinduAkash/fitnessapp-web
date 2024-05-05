import React from "react";
import "../assets/styles/profile-meal-card.css";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";

function ProfileMealCard() {
    return(
        <div className={'profile-meal-card'}>
            <div className={'profile-meal-card-title'}>
                <div></div>
                <div>{`Siril Aiya`}</div>
                {/*<div>{`${post.user?.firstName} ${post.user?.lastName}`}</div>*/}
                {/*{myPost && <div>*/}
                {/*    <Button variant={'outlined'} size={'small'} onClick={updatePost}><EditIcon/>Edit</Button>*/}
                {/*    <Button variant={'outlined'} size={'small'} onClick={updatePost}><DeleteIcon/>Delete</Button>*/}
                {/*</div>}*/}
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi delectus dolores est ex, expedita fugiat fugit hic id iste nemo omnis provident ratione repudiandae sunt tempora tempore unde velit vero?</p>
            <section className={'food-container'}>
                <div className={'food'}>
                    <div>Rice</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ex exercitationem facilis laboriosam laborum nam necessitatibus nesciunt numquam odio optio perferendis placeat praesentium qui rem tempore, totam unde voluptatem.</p>
                </div>

                <div className={'food'}>
                    <div>Rice</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ex exercitationem facilis laboriosam laborum nam necessitatibus nesciunt numquam odio optio perferendis placeat praesentium qui rem tempore, totam unde voluptatem.</p>
                </div>
            </section>
            <div>
                <Button variant={"outlined"}>Expand More</Button>
            </div>
        </div>
    )
}

export default ProfileMealCard;