import React from 'react';
import '../assets/styles/friend.css';
import UserVector from "../assets/user-vector.jpeg";
import {useNavigate} from "react-router-dom";

function Friend(props) {

    let navigate = useNavigate();

    return(
        <div className={'friend'} onClick={() => navigate(`/profile/${props.user.id}`)}>
            <div className={'friend-detail'}>
                <div className={'image'}
                     style={{
                         background: `url(${props.user.profilePic ? props.user.profilePic : UserVector})`,
                         backgroundPosition: 'center',
                         backgroundSize: 'cover',
                         backgroundRepeat: 'no-repeat'
                     }}></div>
                <div className={'name'}>{props.user.firstName + " " + props.user.lastName}</div>
                {
                    (props.user.isFollower || props.user.isFollowing) && <div className={'status'}>{(props.user.isFollower && props.user.isFollowing) ? "Friends" : props.user.isFollower ? "Follower" : props.user.isFollowing ? "Following": ""}</div>
                }
            </div>
        </div>
    )

}

export default Friend;