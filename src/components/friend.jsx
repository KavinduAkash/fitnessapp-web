import React from 'react';
import '../assets/styles/friend.css';
import Button from "@mui/material/Button";

function Friend(props) {

    return(
        <div className={'friend'}>
            <div className={'image'}
                 style={{
                     background: `url(${props.image})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat'
            }}></div>
            <div className={'name'}>{props.name}</div>
        </div>
    )

}

export default Friend;