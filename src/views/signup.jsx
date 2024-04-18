import React, {useState} from "react";
import Header from "../components/header.jsx";
import {Box, Button, FormControl, Grid, InputLabel, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Logo from "../assets/fitness-social-logo.png";
import * as API from "../service/api";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import * as emailValidator from "../utils/validators/email.validator";
import {validateEmail} from "../utils/validators/email.validator";

function SignUp() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = () => {

        let validEmail = validateEmail(email);
        console.log("valid email: ", validEmail);

        firstName.length<1 ?
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please enter valid first name",
                showConfirmButton: false,
                timer: 1500
            }):
            lastName.length<1 ?
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Please enter valid last name",
                    showConfirmButton: false,
                    timer: 1500
                }):
                !validEmail ?
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Please enter valid email",
                        showConfirmButton: false,
                        timer: 1500
                    }):
                    dob==new Date() ?
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Please enter valid birthday",
                            showConfirmButton: false,
                            timer: 1500
                        }):
                        password<8 ?
                            Swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: "Please enter password with 8 characters",
                                showConfirmButton: false,
                                timer: 1500
                            }):
                            password !== confirmPassword ?
                                Swal.fire({
                                    position: "top-end",
                                    icon: "error",
                                    title: "Please enter correct confrim password",
                                    showConfirmButton: false,
                                    timer: 1500
                                }):
                            call_register();
    }
    const call_register = () => {

        // dob.toString().split("T")[0];

        API.register({
            firstName,
            lastName,
            email,
            dob: dob.toISOString().split('T')[0],
            gender,
            password
        }).then(r => {
            console.log(r);
            if(r.success) {
                if(r.data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your account is created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/signin");
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: r.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry! Something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }).catch(e => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sorry! Something went wrong",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <div className={'auth-views'}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={8}  className={'auth-sub-views auth-left-view'}>
                    <section className={'auth-bg-view'}></section>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} className={'auth-sub-views'}>


                    <form action="">

                        <Box sx={{marginTop: '10px', textAlign: 'center'}}>
                            <img src={Logo} alt="fitness social logo" width={'150'}/>
                        </Box>

                        <section style={{maxWidth: '500px', padding: '0px 50px'}}>


                            <Box sx={{marginTop: '10px', textAlign: 'center'}}>
                                <h2>Sign Up</h2>
                            </Box>

                            <Box sx={{display: 'flex', marginTop: '10px'}}>
                                <Box sx={{marginRight: '2px', flex: 1}}>
                                    <TextField sx={{width: '100%'}} id="filled-basic" label="First Name" variant="filled" onChange={e => setFirstName(e.target.value)} />
                                </Box>
                                <Box sx={{marginLeft: '2px', flex: 1}}>
                                    <TextField sx={{width: '100%'}} id="filled-basic" label="Last Name" variant="filled" onChange={e => setLastName(e.target.value)} />
                                </Box>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" label="Email" variant="filled" sx={{width: '100%'}} onChange={e => setEmail(e.target.value)} />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <DatePicker style={{width: '100%'}} class={"custom-datepicker"} selected={dob} onChange={e => setDob(e)} />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <FormControl variant="filled" sx={{width: '100%'}}>
                                    <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={"MALE"}
                                        onChange={e => setGender(e.target.value)}
                                    >
                                        <MenuItem value={'MALE'}>Male</MenuItem>
                                        <MenuItem value={'FEMALE'}>Female</MenuItem>
                                        <MenuItem value={'OTHER'}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" type="password" label="Password" variant="filled" sx={{width: '100%'}} onChange={e => setPassword(e.target.value)} />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" type="password" label="Confirm Password" variant="filled" sx={{width: '100%'}} onChange={e => setConfirmPassword(e.target.value)} />
                            </Box>

                            <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                                <Button variant="contained" onClick={register} >Sign Up</Button>
                            </Box>

                        </section>

                        <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                            Already have an account? <span className={'edit-btn-2'} onClick={() => navigate("/signin")}>Sign In</span>
                        </Box>

                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUp;