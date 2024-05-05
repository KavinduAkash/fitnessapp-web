import React, {useEffect, useState} from 'react';
import Header from "../components/header.jsx";
import CreateWorkoutBar from "../components/create-workout-bar.jsx";
import ProfileWorkoutCard from "../components/profile-workout-card.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Autocomplete, Box, FormControl, InputLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as API from "../service/api.js";
import Swal from "sweetalert2";
import {createWorkoutPlan, getWorkouts} from "../service/api.js";

function Workout() {
    const [open12, setOpen12] = React.useState(false);
    const [scroll12, setScroll12] = React.useState('paper');
    const [allExercises, setAllExercises] = React.useState([]);
    const [exercises, setExercises] = React.useState([]);
    const [allWorkouts, setAllWorkouts] = React.useState([]);

    const[exId, setExId] = useState(0);
    const[exName, setExName] = useState("");
    const[exType, setExType] = useState("CARDIO");
    const[exDesc, setExDesc] = useState("");

    const[workoutId, setWorkoutId] = useState(0);
    const[workoutName, setWorkoutName] = useState("");
    const[workoutDesc, setWorkoutDesc] = useState("");

    const handleClose12 = () => {
        setOpen12(!open12);
    }

    const addNewExercise = () => {
        let exs = {
            id: exId,
            name: exName,
            type: exType,
            value: "NOTE",
            desc: exDesc
        }
        let newEx = [...exercises];
        newEx.push(exs);
        setExercises(newEx);
    }

    const createNewWorkout = () => {
        API.createWorkoutPlan(workoutName, workoutDesc, exercises).then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Workout plan created successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setWorkoutName("")
                    setWorkoutDesc("")
                    setExercises([]);
                    setExId(0);
                    setExName("");
                    setExType("CARDIO");
                    setExDesc("");
                    setWorkoutId(0)
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

    const getEx = () => {
        API.getEx().then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    let arr = [];
                    r.data.body.map(r => {
                        let result = {label: r.name, id: r.id, type: r.type}
                        arr.push(result);
                    });
                    setAllExercises(arr);
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

    const getWorkouts = () => {
        API.getWorkouts().then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    setAllWorkouts(r.data.body);
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

    const exSelect = (e) => {
        console.log("eeeee: ",e);
        setExId(e.id);
        setExName(e.label);
        setExType(e.type);
    }

    const updateUpdateWorkoutPlan = () => {
        API.updateWorkoutPlan(workoutId, workoutName, workoutDesc, exercises).then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Workout plan updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setWorkoutName("")
                    setWorkoutDesc("")
                    setExercises([]);
                    setExId(0);
                    setExName("");
                    setExType("CARDIO");
                    setExDesc("");
                    setWorkoutId(0)
                    setOpen12(!open12)
                    getWorkouts();
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

            console.error(e)

        })
    }

    const openUpdateWorkout = (data) => {
        setWorkoutId(data.id);
        setWorkoutName(data.title);
        setWorkoutDesc(data.description);
        setExercises(data.exercises);
        setOpen12(!open12);
    }
    const deleteWorkout = (id) => {
        API.deleteWorkout(id).then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Workout deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    getWorkouts();

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

    useEffect(() => {
        getEx();
        getWorkouts();
    }, [])

    return (
        <div>

            <Dialog
                open={open12}
                onClose={handleClose12}
                scroll={scroll12}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">{workoutId>0 ? 'Update workout plan' : 'Create workout plan'}</DialogTitle>
                <DialogContent dividers={scroll12 === 'paper'}>

                    <Box sx={{marginTop: '10px'}}>
                        <TextField type="text" id="filled-basic" label="Workout Name" variant="filled"
                                   sx={{width: '100%'}}
                                   value={workoutName} onChange={e => setWorkoutName(e.target.value)}
                        />
                    </Box>

                    <Box sx={{marginTop: '10px'}}>
                        <div className={'post-description'}>
                            <TextField
                                placeholder="Enter workout description"
                                multiline
                                rows={2}
                                maxRows={4}
                                value={workoutDesc}
                                onChange={e => setWorkoutDesc(e.target.value)}
                            />
                        </div>
                    </Box>

                    <Box sx={{marginTop: '10px', minWidth: '500px'}}>
                        <section>
                            <div className={'added-food'}>
                                {
                                    exercises.map(r =>
                                        <div className={'food'}>
                                            <div>{r.name}</div>
                                            <p>{r.desc}</p>
                                            <div style={{textAlign: 'end'}}><Button variant={'text'} sx={{color: 'red'}}>Delete</Button></div>
                                        </div>
                                    )
                                }

                            </div>
                            <div className={'food-enter'}>

                                <h3>Add New Exercise</h3>

                                <Box sx={{marginTop: '10px'}}>

                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={allExercises}
                                        sx={{ width: '100%' }}
                                        onChange={(event, value) => exSelect(value)}
                                        renderInput={(params) => <TextField {...params} label="Search Exercises" sx={{width: '100%'}} />}
                                    />

                                </Box>
                                <Box sx={{marginTop: '10px'}}>
                                    <TextField type="text" id="filled-basic" label="Exercise Name"
                                               onChange={e => setExName(e.target.value)}
                                               value={exName}
                                               sx={{width: '100%'}}/>
                                </Box>

                                <Box sx={{ minWidth: 120, marginTop: '10px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Exercise Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={exType}
                                            label="Exercise Type"
                                            onChange={e => setExType(e.target.value)}
                                        >
                                            <MenuItem value={"CARDIO"}>CARDIO</MenuItem>
                                            <MenuItem value={"STRENGTH_TRAINING"}>STRENGTH_TRAINING</MenuItem>
                                            <MenuItem value={"FLEXIBILITY_MOBILITY"}>FLEXIBILITY_MOBILITY</MenuItem>
                                            <MenuItem value={"SPORTS_SPECIFIC"}>SPORTS_SPECIFIC</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{marginTop: '10px'}}>
                                    <div className={'post-description'}>
                                        <TextField
                                            placeholder="Enter exercise description"
                                            multiline
                                            rows={2}
                                            maxRows={4}
                                            value={exDesc}
                                            onChange={e => setExDesc(e.target.value)}
                                        />
                                    </div>
                                </Box>

                                <div style={{marginTop: '10px'}}>
                                    <Button variant={'outlined'} sx={{width: '100%'}}
                                            onClick={addNewExercise}
                                    >Add</Button>
                                </div>
                            </div>
                        </section>
                    </Box>

                    <div style={{textAlign: 'end', marginTop: '20px'}}>
                        <Button variant={'contained'}
                                onClick={workoutId>0 ? updateUpdateWorkoutPlan : createNewWorkout}
                            // onClick={createNewWorkout}
                        >{workoutId>0 ? 'Update' : 'Publish'}</Button>
                    </div>

                </DialogContent>
            </Dialog>

            <Header/>
            <section className={'common-content'}>
                <CreateWorkoutBar update={handleClose12}/>
                <section>
                    {allWorkouts.map(r =>  <ProfileWorkoutCard data={r} openUpdate={openUpdateWorkout} deleteWorkout={deleteWorkout}/>)}
                </section>
            </section>

        </div>
    );
}

export default Workout;