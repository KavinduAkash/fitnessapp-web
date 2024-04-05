import React, {useState} from "react";
import Header from "../components/header.jsx";
import {Box, Button, FormControl, Grid, InputLabel, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Logo from "../assets/fitness-social-logo.png";

function SignUp() {

    const [startDate, setStartDate] = useState(new Date());

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
                                    <TextField sx={{width: '100%'}} id="filled-basic" label="First Name" variant="filled" />
                                </Box>
                                <Box sx={{marginLeft: '2px', flex: 1}}>
                                    <TextField sx={{width: '100%'}} id="filled-basic" label="Last Name" variant="filled" />
                                </Box>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" label="Email" variant="filled" sx={{width: '100%'}} />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <DatePicker style={{width: '100%'}} class={"custom-datepicker"} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
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

                            <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                                <Button variant="contained" >Sign Up</Button>
                            </Box>

                        </section>

                        <Box sx={{marginTop: '30px', textAlign: 'center'}}>
                            Already have an account? <span className={'edit-btn-2'}>Sign In</span>
                        </Box>

                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUp;