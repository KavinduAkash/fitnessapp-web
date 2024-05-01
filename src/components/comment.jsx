import React, {useEffect, useState} from 'react';
import "../assets/styles/comment.css";
import {Button, TextField} from "@mui/material";
import * as API from "../service/api";
import Swal from "sweetalert2";
import {PROFILE_ID} from "../utils/const.js";

function Comment(props) {

    const [myPost, setMyPost] = useState(false);
    const [myComment, setMyComment] = useState("");
    const [comments, setComments] = useState([]);

    const getPostComments = () => {
        API.getPostComments(props.post.id).then(r => {
            if (r.data.success) {
                setComments(r.data.body)
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry!, something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(e => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sorry!, something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    const publishComment = () => {
        API.addComment(props.post.id, myComment).then(r => {
            if (r.data.success) {
                getPostComments();
                setMyComment("");
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry!, something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(e => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sorry!, something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    const deleteComment = (id) => {
        API.deleteComment(id).then(r => {
            if (r.data.success) {
                getPostComments();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry!, something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(e => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sorry!, something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        })
    }

    useEffect(() => {
        getPostComments();
        console.log("AA:", +localStorage.getItem(PROFILE_ID))
        console.log("BB:", props.post.user.id)
        setMyPost(+localStorage.getItem(PROFILE_ID)===props.post.user.id);
    }, [])

    return (
        <section className={"comment-container"}>
            <div className={"comment-action"}>
                <TextField
                    placeholder="Enter your comment"
                    multiline
                    rows={2}
                    value={myComment}
                    onChange={e => setMyComment(e.target.value)}
                />
                <div style={{textAlign: 'end', margin: '4px 0px 10px 0px'}}>
                    <Button variant={'contained'} onClick={publishComment}>Publish</Button>
                </div>
            </div>

            {
                comments.map((comment, index) => <div className={'comment-card'}>
                        <div>
                            <div style={{background: `url(${comment.user.profilePic})`}}></div>
                            <div>{`${comment.user.firstName} ${comment.user.lastName}`}</div>
                            <div>{comment.date.split("T")[0]}</div>
                        </div>
                        <p>{comment.comment}</p>
                        { (myPost || comment.user.id===+localStorage.getItem(PROFILE_ID)) && <div className={'delete-comment'}>
                            <span onClick={() => deleteComment(comment.id)}>Delete</span>
                        </div>}
                    </div>
                )
            }
        </section>
    )
}

export default Comment;