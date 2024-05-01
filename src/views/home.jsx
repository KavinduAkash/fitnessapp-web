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
import {Box, FormControl, Grid, InputLabel, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import ImageUploading from "react-images-uploading";
import {ACCESS_TOKEN} from "../utils/const.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import { getFile, uploadFilesTo } from 'easy-file-picker';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import * as API from "../service/api";
import Comment from "../components/comment.jsx";

function Home() {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [open2, setOpen2] = React.useState(false);
    const [scroll2, setScroll2] = React.useState('paper');

    const [images, setImages] = React.useState([]);
    const [note, setNote] = React.useState("");

    const [posts, setPosts] = React.useState([]);
    const [currentPost, setCurrentPost] = React.useState(null);

    const maxNumber = 3;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const handleClose = () => {
        setOpen(!open);
    };

    const handleClose2= () => {
        setOpen2(!open2);
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

    const uploadFile = async () => {
        const filex = await getFile();
        console.log("filex", URL.createObjectURL(filex))
        let img = images;
        setImages([...img, filex])

        console.log(images)
        // if(file) {
        //     await uploadFilesTo("http://example.com", file);
        // }
    }

    const removeFile = (index) => {
        let img = images;
        img.splice(index, 1);
        setImages([...img])
    }

    const getPosts = () => {
        API.getPosts().then(r => {
            console.log(r);
            setPosts(r.data.body)
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
    
    const createPost = () => {
        API.createPost({files: images, note: note}).then(r => {
            if(r.data.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Post published successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setImages([]);
                setNote("");
                setOpen(false);
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

    const openComments = (post) => {
        setCurrentPost(post);
        setOpen2(true);
    }

    useEffect(() => {
        getPosts();
    }, []);

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
                    {/*<ImageUploading*/}
                    {/*    multiple*/}
                    {/*    value={images}*/}
                    {/*    onChange={onChange}*/}
                    {/*    maxNumber={maxNumber}*/}
                    {/*    dataURLKey="data_url"*/}
                    {/*    acceptType={["jpg"]}*/}
                    {/*>*/}
                    {/*    {({*/}
                    {/*          imageList,*/}
                    {/*          onImageUpload,*/}
                    {/*          onImageRemoveAll,*/}
                    {/*          onImageUpdate,*/}
                    {/*          onImageRemove,*/}
                    {/*          isDragging,*/}
                    {/*          dragProps*/}
                    {/*      }) => (*/}
                    {/*        // write your building UI*/}
                    {/*        <div className="upload__image-wrapper">*/}
                    {/*            <button*/}
                    {/*                className={"image-dropper"}*/}
                    {/*                style={isDragging ? { color: "red" } : null}*/}
                    {/*                onClick={onImageUpload}*/}
                    {/*                {...dragProps}*/}
                    {/*            >*/}
                    {/*                Click or Drop here*/}
                    {/*            </button>*/}
                    {/*            &nbsp;*/}
                    {/*            <button onClick={onImageRemoveAll}>Remove all images</button>*/}
                    {/*            {imageList.map((image, index) => (*/}
                    {/*                <div key={index} className="image-item">*/}
                    {/*                    <img src={image.data_url} alt="" width="100" />*/}
                    {/*                    <div className="image-item__btn-wrapper">*/}
                    {/*                        <button onClick={() => onImageUpdate(index)}>Update</button>*/}
                    {/*                        <button onClick={() => onImageRemove(index)}>Remove</button>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</ImageUploading>*/}


                    <div className={'image-dropper-container'}>
                        <button className={"image-dropper"} onClick={uploadFile} disabled={images.length>=4 ?true:false}>
                            <div className={"image-dropper-content"}>
                                <div>{`Select your media `}</div><PermMediaIcon/><div>{` ( ${images.length}/4 )`}</div>
                            </div>
                        </button>
                    </div>

                    {images.length > 0 && <div style={{margin: "10px 0px"}}>
                        <Grid container spacing={1}>
                            {
                                images.map((file, index) => {
                                    console.log("fff: ", file.type)
                                    let fff = URL.createObjectURL(file);
                                    // return <img src={URL.createObjectURL(file)} alt="" width={'100px'}/>
                                    return <Grid item xs={3} key={index}>
                                        <div style={{background: `url(${fff})`, backgroundPosition: 'center', backgroundSize: 'cover'}} className={'image-block'}>
                                            {file.type==="video/mp4" && <div className={'image-block-video'}><PlayCircleOutlineIcon/></div>}
                                            <div className={'image-block-remove'} onClick={() => removeFile(index)}><HighlightOffIcon/></div>
                                        </div>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </div>}

                    <div className={'post-description'}>
                        <TextField
                            placeholder="Enter post description"
                            multiline
                            rows={5}
                            maxRows={4}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>

                    <div style={{textAlign: 'end', marginTop: '20px'}}>
                        <Button variant={'contained'} onClick={createPost}>Publish</Button>
                    </div>

                </DialogContent>
            </Dialog>


            <Dialog
                open={open2}
                onClose={handleClose2}
                scroll={scroll2}
                aria-labelledby="scroll-dialog-title2"
                aria-describedby="scroll-dialog-description2"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <Comment post={currentPost}/>

                </DialogContent>
            </Dialog>

            <Header/>
            <section className={'home-content'}>

                <CreatePostBar update={handleClose}/>

                {
                    posts.map((post, index) =>  <HomePostCard data={post} openComments={openComments}/>)
                }

            </section>
        </div>
    );
}

export default Home;