import React, {useEffect, useState} from "react";
import "../assets/styles/profile-meal-card.css";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import {PROFILE_ID} from "../utils/const.js";

function ProfileMealCard(props) {

    const[minArray, setMinArray] = useState([]);
    const[ex, setEx] = useState(false);

    useEffect(() => {
        if(props.data.meals && props.data.meals.length>2) {
            let newArr = [props.data.meals[0],
            props.data.meals[1]];
            setMinArray(newArr);
            setEx(false);
        }
    }, [])

    return(
        <div className={'profile-meal-card'}>
            <div className={'profile-meal-card-title'}>
                <div></div>
                <div>{`${props.data.userDTO.firstName} ${props.data.userDTO.lastName}`}</div>
                {+localStorage.getItem(PROFILE_ID)===props.data.userDTO.id && <div>
                    <Button variant={'outlined'} size={'small'} onClick={() => props.openUpdate(props.data)}><EditIcon/>Edit</Button>
                    <Button variant={'outlined'} size={'small'} onClick={() => props.deleteMeal(props.data.id)}><DeleteIcon/>Delete</Button>
                </div>}
            </div>
            <h3 style={{marginLeft: "10px"}}>{props.data.title}</h3>
            <p>{props.data.description}</p>
            <section className={'food-container'}>

                {
                    minArray.length > 0 ?
                        ex ? props.data.meals.map(m =>
                            <div className={'food'}>
                                <div>Rice</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ex exercitationem facilis laboriosam laborum nam necessitatibus nesciunt numquam odio optio perferendis placeat praesentium qui rem tempore, totam unde voluptatem.</p>
                            </div>
                        ):
                            minArray.map(m =>
                                <div className={'food'}>
                                    <div>Rice</div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ex exercitationem facilis laboriosam laborum nam necessitatibus nesciunt numquam odio optio perferendis placeat praesentium qui rem tempore, totam unde voluptatem.</p>
                                </div>
                            ):
                        props.data.meals.map(m =>
                            <div className={'food'}>
                                <div>Rice</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ex exercitationem facilis laboriosam laborum nam necessitatibus nesciunt numquam odio optio perferendis placeat praesentium qui rem tempore, totam unde voluptatem.</p>
                            </div>
                        )
                }

            </section>
            { minArray.length > 0 && <div>
                <Button variant={"outlined"} onClick={() => setEx(!ex)}>{ex?`Show less` : `Show more`}</Button>
            </div> }
        </div>
    )
}

export default ProfileMealCard;