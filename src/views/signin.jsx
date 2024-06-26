import React, {useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import Logo from "../assets/fitness-social-logo.png";
import * as API from "../service/api";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import * as emailValidator from "../utils/validators/email.validator";
import {ACCESS_TOKEN, PROFILE_ID, REFRESH_TOKEN} from "../utils/const.js";
import * as AgeFinder from "../utils/agefinder.js";

function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        !emailValidator.validateEmail(email) ?
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please enter valid email",
                showConfirmButton: false,
                timer: 1500
            }):
            password.length < 1 ?
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Please enter valid password",
                    showConfirmButton: false,
                    timer: 1500
                }):
                call_login();
    }

    const loadProfile = () => {
        API.getMyProfileDetails().then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    localStorage.setItem(PROFILE_ID, r.data.body.id);
                    navigate("/");
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

    const call_login = () => {
        API.login({email: email, password: password}).then(r => {
            // true
            console.log("Success: ", r);
            if(r.success) {
                if(r.data.statusCode==200) {
                    // success
                    localStorage.setItem(ACCESS_TOKEN, r.data.token);
                    localStorage.setItem(REFRESH_TOKEN, r.data.refreshToken);
                    loadProfile();
                } else {
                    // error
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Sorry!, Incorrect email or password",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else {
                // error
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry!, Something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }).catch(c => {
            // false
            console.log("Error: ", c);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sorry!, Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    return (
        <div className={'auth-views'}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={8}  className={'auth-sub-views auth-left-view'}>
                    <section className={'auth-bg-view2'}></section>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} className={'auth-sub-views'}>

                    <form action="">

                        <Box sx={{marginTop: '10px', textAlign: 'center'}}>
                            <img src={Logo} alt="fitness social logo" width={'150'}/>
                        </Box>

                        <section style={{maxWidth: '500px', padding: '0px 50px'}}>

                            <Box sx={{marginTop: '10px', textAlign: 'center'}}>
                                <h2>Sign In</h2>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField
                                    id="filled-basic"
                                    label="Email"
                                    variant="filled"
                                    sx={{width: '100%'}}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField
                                    id="filled-basic"
                                    type="password"
                                    label="Password"
                                    variant="filled"
                                    sx={{width: '100%'}}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Box>

                            <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                                <Button variant="contained" onClick={login}>Sign In</Button>
                            </Box>

                        </section>

                        <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                            Don't have an account? <span className={'edit-btn-2'} onClick={() => navigate("/signup")}>Sign Up</span>
                        </Box>

                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignIn;