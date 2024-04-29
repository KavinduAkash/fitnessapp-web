import React, {useEffect, useState} from "react";
import Friend from "../components/friend.jsx";
import Header from "../components/header.jsx";
import "../assets/styles/user.css";
import {Input} from "@mui/material";
import * as API from "../service/api.js";

const ariaLabel = { 'aria-label': 'description' };

function User() {

    const[search, setSearch] = useState("");
    const[users, setUsers] = useState([]);

    const getUser = () => {
        API.getUsers(search).then(r => {
            console.log(r);
            setUsers(r.data.body);
        }).catch(e => {
            console.error(e);
        })
    }

    useEffect(() => {
        getUser();
    }, [search]);

    return(
        <div>
            <Header/>
            <section className={'common-content'}>
                <div className={'user-content'}>
                    <div className={'user-content-search'}>
                        <span>({` ${users.length} `})</span><Input placeholder="Search" inputProps={ariaLabel} onChange={e => setSearch(e.target.value)}/>
                    </div>
                    {
                        users.map((user, index) =>
                            <Friend user={user}/>
                        )
                    }
                </div>
            </section>
        </div>
    )

}

export default User;