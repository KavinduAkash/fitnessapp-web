import React, {useEffect} from "react";
import Header from "../components/header.jsx";
import "../assets/styles/home.css";
import HomePostCard from "../components/home-post-card.jsx";
import CreatePostBar from "../components/create-post-bar.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import UserVector from "../assets/user-vector.jpeg";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload.js";
import {Box, FormControl, InputLabel, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ImageUploading from "react-images-uploading";
import {ACCESS_TOKEN} from "../utils/const.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [images, setImages] = React.useState([]);
    const maxNumber = 3;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const handleClose = () => {
        setOpen(!open);
    };

    // handle access
    useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if(!accessToken) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please sign in",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/signin")
        }
    },[]);

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">Create new post</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={["jpg"]}
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps
                          }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                    style={isDragging ? { color: "red" } : null}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </button>
                                &nbsp;
                                <button onClick={onImageRemoveAll}>Remove all images</button>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image.data_url} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)}>Update</button>
                                            <button onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>


                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </DialogContent>
            </Dialog>


            <Header/>
            <section className={'home-content'}>

                <CreatePostBar update={handleClose}/>

                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
                <HomePostCard/>
            </section>
        </div>
    );
}

export default Home;