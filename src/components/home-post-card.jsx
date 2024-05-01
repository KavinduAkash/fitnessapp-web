import React, {useEffect, useState} from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "../assets/styles/home-post-card.css";
import Button from "@mui/material/Button";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import * as API from "../service/api";
import Swal from "sweetalert2";
import ReactPlayer from "react-player";
import {videoExtensions} from "../utils/fileExtentions";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];

function HomePostCard(props) {

    const[post, setPost] = useState({});
    const[postImages, setPostImages] = useState([]);

    const likePost = () => {
        API.likePost(props.data.id).then(r => {
            console.log(r)
            if(!r.data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry!, something went wrong2",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // props.data.myLike = true;
                setPost(r.data.body);
            }
        }).catch(e => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sorry!, something went wrong3",
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    useEffect(() => {
        setPost(props.data);
        console.log(props.data.description, ": ", props.data.images);
        setPostImages(props.data.images)
    },[])

    return(
        <div className={'home-post-card'}>
            <div className={'home-post-card-header'}>
                <div></div>
                <div>{`${post.user?.firstName} ${post.user?.lastName}`}</div>
            </div>
            <div className={'home-post-card-description'}>
                {post.description}
            </div>
            <div className={'home-post-card-content'}>
                <Slide>
                    {
                        postImages.map((r, index) =>
                        {
                            console.log(videoExtensions.includes(r.url.split(".")[r.url.split(".").length - 1]));
                            return <div className="each-slide-effect">
                                <div style={{ 'backgroundImage': `url(${r.url})` }}>
                                    <div>{index+1}/{postImages.length}</div>
                                    {videoExtensions.includes(r.url.split(".")[r.url.split(".").length - 1]) && <span><Button variant={'outlined'} onClick={() => props.openVideo(r.url)}><PlayCircleOutlineIcon/>Play</Button></span>}
                                </div>
                            </div>}
                        )

                    }
                </Slide>
            </div>
            <div className={'home-post-card-footer'}>
                <div className={'home-post-card-footer-react'}>
                    <div>{post.likes?.length} Likes</div>
                    <div>{post.comments?.length} Comments</div>
                </div>
                <div className={'home-post-card-footer-action'}>
                    <Button variant="text" onClick={likePost}>{post.myLike ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/>}&nbsp;Like</Button>
                    <Button variant="text" onClick={() => props.openComments(post)}><ChatBubbleOutlineIcon/>&nbsp;Comment</Button>
                </div>
            </div>
        </div>
    )

}

export default HomePostCard;