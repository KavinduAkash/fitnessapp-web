import React from "react";
import "../assets/styles/profile-workout-card.css";

function ProfileWorkoutCard() {

    return(
        <div className={'profile-workout-card'}>
            <div>Workout</div>
            <div className={"   running-status"}>Running</div>
            <div>Workout Count: 10</div>
            <div>Started Date: 2024-04-26</div>
            <div>Day: 10</div>
        </div>
    )

}

export default ProfileWorkoutCard;