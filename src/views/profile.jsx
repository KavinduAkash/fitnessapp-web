import React, {useState} from "react";
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

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [startDate, setStartDate] = useState(new Date());

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
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
                            <div style={{background: `url(${UserVector})`, backgroundPosition: 'center', backgroundSize: 'cover', margin: 'auto'}} className={'profile-edit-pic'}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </div>
                        </section>

                        <section>

                            <Box sx={{marginTop: '10px'}}>
                                <h3>Basic Info</h3>
                            </Box>

                            <Box sx={{display: 'flex', marginTop: '10px'}}>
                                <Box sx={{marginRight: '2px'}}>
                                    <TextField id="filled-basic" label="First Name" variant="filled" />
                                </Box>
                                <Box sx={{marginLeft: '2px'}}>
                                    <TextField id="filled-basic" label="Last Name" variant="filled" />
                                </Box>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" label="Email" variant="filled" sx={{width: '100%'}} />
                            </Box>

                            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px'}}>
                                <Box sx={{flex:1}}>
                                    <DatePicker class={"custom-datepicker"} selected={startDate} onChange={(date) => setStartDate(date)} />
                                </Box>

                                <Box sx={{flex:1}}>
                                    <FormControl variant="filled" sx={{width: '100%'}}>
                                        <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={"MALE"}
                                            // onChange={handleChange}
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
                      Siril Aiya <span className={'profile-head-edit'} onClick={handleClickOpen('body')}><EditIcon style={{fontSize: '13px'}}/>Edit</span>
                  </div>

                  <div className={'profile-head-data'}>

                      <div><span>Gender</span>Male</div>
                      <div><span>Age</span>28</div>
                      <div><span>Followers</span>200</div>
                      <div><span>Following</span>201</div>

                  </div>

              </section>
            </section>
        </div>
    )
}

export default Profile;