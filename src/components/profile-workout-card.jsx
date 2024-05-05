import React, {useEffect} from "react";
import "../assets/styles/profile-workout-card.css";
import {PROFILE_ID} from "../utils/const.js";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProfileWorkoutCard(props) {

    useEffect(() => {
        console.log(props.data)
    }, [])

    return(
        <div className={'profile-workout-card'}>
            <div className={'profile-workout-card-title'}>
                <div></div>
                <div>{`${props.data.userDTO.firstName} ${props.data.userDTO.lastName}`}</div>
                {+localStorage.getItem(PROFILE_ID)===props.data.userDTO.id && <div>
                    <Button variant={'outlined'} size={'small'} onClick={() => props.openUpdate(props.data)}><EditIcon/>Edit</Button>
                    <Button variant={'outlined'} size={'small'} onClick={() => props.deleteWorkout(props.data.id)}><DeleteIcon/>Delete</Button>
                </div>}
            </div>
            <section className={'workout-card-content'}>

                <h3>{props.data.title}</h3>
                <p>{props.data.description}</p>
                <section>

                    {
                        props.data.exercises.map(r =>
                            <div className={"exercise-card"}>
                                <div>{r.name}</div>
                                <p>{r.desc}</p>
                            </div>
                        )
                    }

                </section>

            </section>
        </div>
    )

}

export default ProfileWorkoutCard;