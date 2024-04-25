import React, {useEffect, useState, useRef} from "react";
import Header from "../components/header.jsx";
import '../assets/styles/profile.css';
import UserVector from '../assets/user-vector.jpeg';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/material/styles';
import {Box, FormControl, InputLabel, TextField} from "@mui/material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

import * as API from "../service/api";

import * as AgeFinder from "../utils/agefinder";
import Swal from "sweetalert2";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Profile() {

    const fileInputRef = useRef(null); // Reference to the file input element

    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDOB] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [visibility, setVisibility] = useState("PUBLIC");
    const [status, setStatus] = useState("ACTIVE");
    const [image, setImage] = useState(null);

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [startDate, setStartDate] = useState(new Date());


    const [uFirstName, setUFirstName] = useState("");
    const [uLastName, setULastName] = useState("");
    const [uDob, setUDOB] = useState("");
    const [uGender, setUGender] = useState("");
    const [uImage, setUImage] = useState(null);
    const [uFile, setUFile] = useState(null);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const loadMyProfile = () => {
        API.getMyProfileDetails().then(r => {
            console.log(r);
            if(r.success) {
                if(r.data.success) {
                    setId(r.data.body.id);
                    setFirstName(r.data.body.firstName);
                    setLastName(r.data.body.lastName);
                    setDOB(new Date(r.data.body.dob));
                    setAge(AgeFinder.findAge(r.data.body.dob.split("T")[0]));
                    setGender(r.data.body.gender);
                    setEmail(r.data.body.email);
                    setVisibility(r.data.body.visibility);
                    setStatus(r.data.body.status);
                    setImage(r.data.body.profilePic);

                    setUFirstName(r.data.body.firstName);
                    setULastName(r.data.body.lastName);
                    setUDOB(new Date(r.data.body.dob));
                    setUGender(r.data.body.gender);
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Sorry!, something went wrong",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
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

    const handeImage = () => {
        fileInputRef.current.click(); // Click on the file input element
    };

    const handeImage2 = (event) => {
        const file = event.target.files[0]; // Get the selected file
        console.log("image: ", file);
        if (file) {
            // Revoke previous Blob URL if it exists
            if (uImage) {
                URL.revokeObjectURL(uImage);
            }
            const blob = new Blob([file], { type: file.type }); // Convert file to Blob
            const url = URL.createObjectURL(blob); // Generate Blob URL
            console.log("image2: ", url);
            setUFile(file);
            setUImage(url);
        }
    }

    const updateProfile = () => {
        if(uImage) {
            updateProfilePic();
        }
        updateProfileDetails();
    }

    const updateProfilePic = () => {
        API.updateMyProfilePic(uFile).then(r => {
            console.log("success: profile pic updated");
        }).catch(e => {
            console.log("error: profile pic updated");
        })
    }

    const updateProfileDetails = () => {
        API.updateMyProfileDetails({
            id: id,
            firstName: uFirstName,
            lastName: uLastName,
            dob: uDob,
            email: email,
            password: null,
            gender: uGender,
            role: "USER",
            visibility: visibility,
            status: status,
            profilePic: null
        }).then(r => {
            console.log("success: profile pic updated");
        }).catch(e => {
            console.log("error: profile pic updated");
        })
    }

    const handleClose = () => {
        updateProfile();
    };

    useEffect(() => {
        loadMyProfile();
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Account Settings</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <form action="">

                        <section style={{marginBottom: '20px'}}>
                            {/*{uImage ?*/}
                            {/*    <div style={{background: `url(${uImage})`, backgroundPosition: 'center', backgroundSize: 'cover', margin: 'auto'}} className={'profile-edit-pic'}>*/}
                            {/*        <Button*/}
                            {/*            component="label"*/}
                            {/*            role={undefined}*/}
                            {/*            variant="contained"*/}
                            {/*            tabIndex={-1}*/}
                            {/*            startIcon={<CloudUploadIcon />}*/}
                            {/*            // onClick={e => handeImage(e)}*/}
                            {/*        >*/}
                            {/*            Upload file*/}
                            {/*            <VisuallyHiddenInput type="file" onChange={e => handeImage2(e)} ref={fileInputRef}/>*/}
                            {/*        </Button>*/}
                            {/*    </div>:*/}
                            {/*    <div style={{background: `url(${UserVector})`, backgroundPosition: 'center', backgroundSize: 'cover', margin: 'auto'}} className={'profile-edit-pic'}>*/}
                            {/*    <Button*/}
                            {/*        component="label"*/}
                            {/*        role={undefined}*/}
                            {/*        variant="contained"*/}
                            {/*        tabIndex={-1}*/}
                            {/*        startIcon={<CloudUploadIcon />}*/}
                            {/*        // onClick={e => handeImage(e)}*/}
                            {/*    >*/}
                            {/*        Upload file*/}
                            {/*        <VisuallyHiddenInput type="file" onChange={e => handeImage2(e)} ref={fileInputRef}/>*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            {/*}*/}

                            <div style={{background: `url(${image ? image : uImage ? uImage : UserVector})`, backgroundPosition: 'center', backgroundSize: 'cover', margin: 'auto'}} className={'profile-edit-pic'}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    // onClick={e => handeImage(e)}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" onChange={e => handeImage2(e)} ref={fileInputRef}/>
                                </Button>
                            </div>
                        </section>

                        <section>

                            <Box sx={{marginTop: '10px'}}>
                                <h3>Basic Info</h3>
                            </Box>

                            <Box sx={{display: 'flex', marginTop: '10px'}}>
                                <Box sx={{marginRight: '2px'}}>
                                    <TextField id="filled-basic" value={uFirstName} label="First Name" variant="filled" onChange={e => setUFirstName(e.target.value)} />
                                </Box>
                                <Box sx={{marginLeft: '2px'}}>
                                    <TextField id="filled-basic" value={uLastName} label="Last Name" variant="filled" onChange={e => setULastName(e.target.value)} />
                                </Box>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" value={email} disabled label="Email" variant="filled" sx={{width: '100%'}} />
                            </Box>

                            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px'}}>
                                <Box sx={{flex:1}}>
                                    <DatePicker class={"custom-datepicker"} selected={uDob} onChange={(date) => setUDOB(date)} />
                                </Box>

                                <Box sx={{flex:1}}>
                                    <FormControl variant="filled" sx={{width: '100%'}}>
                                        <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={uGender}
                                            onChange={e => setUGender(e.target.value)}
                                        >
                                            <MenuItem value={'MALE'}>Male</MenuItem>
                                            <MenuItem value={'FEMALE'}>Female</MenuItem>
                                            <MenuItem value={'OTHER'}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                        </section>

                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>Save Changes</Button>
                        </DialogActions>

                    </form>

                    <form action="">

                        <section>

                            <Box sx={{marginTop: '10px'}}>
                                <h3>Password Reset</h3>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField type="password" id="filled-basic" label="New Password" variant="filled" sx={{width: '100%'}} />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField type="password" id="filled-basic" label="Confirm Password" variant="filled" sx={{width: '100%'}} />
                            </Box>

                        </section>

                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>Reset Password</Button>
                        </DialogActions>

                    </form>

                    <form action="">

                        <section>
                            <Box sx={{marginTop: '10px'}}>
                                <h3>Delete Account</h3>
                                <Box>
                                    <p><span style={{color: 'red'}}>Warning: </span>Deleting your account will remove all your data permanently.</p>
                                </Box>
                            </Box>
                        </section>

                        <Box sx={{textAlign: 'start'}}>
                            <Button sx={{background: 'red'}} variant="contained" onClick={handleClose}>Delete My Account</Button>
                        </Box>

                    </form>

                </DialogContent>
            </Dialog>



            <Header/>
            <section>
              {/*---- head ----  */}
              <section className={'profile-head'}>

                  <div
                      style={{background: `url(${UserVector})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
                      className={'profile-head-img'}>
                  </div>

                  <div className={'profile-head-title mukta-bold'}>
                      {firstName} {lastName} <span className={'profile-head-edit'} onClick={handleClickOpen('body')}><EditIcon style={{fontSize: '13px'}}/>Edit</span>
                  </div>

                  <div className={'profile-head-data'}>

                      <div><span>Gender</span>{gender}</div>
                      <div><span>Age</span>{age}</div>
                      <div><span>Followers</span>200</div>
                      <div><span>Following</span>201</div>

                  </div>

              </section>
            </section>
        </div>
    )
}

export default Profile;