import Header from "../components/header.jsx";
import ProfileMealCard from "../components/profile-meal-card.jsx";
import CreateMealBar from "../components/create-meal-bar.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import PermMediaIcon from "@mui/icons-material/PermMedia.js";
import {Box, Grid, TextField} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline.js";
import HighlightOffIcon from "@mui/icons-material/HighlightOff.js";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import * as API from "../service/api.js";
import * as AgeFinder from "../utils/agefinder.js";
import Swal from "sweetalert2";
import {deleteMealPlan} from "../service/api.js";

function Meal() {

    const [open10, setOpen10] = React.useState(false);
    const [scroll10, setScroll10] = React.useState('paper');

    const[mealId, setMealId] = useState(0);

    const[meals, setMeals] = useState([]);

    const[mealName, setMealName] = useState("");
    const[mealDesc, setMealDesc] = useState("");

    const[foodName, setFoodName] = useState("");
    const[foodDesc, setFoodDesc] = useState("");

    const[foods, setFoods] = useState([]);

    const handleClose10 = () => {
        if(open) {
            setMealName("")
            setMealDesc("")
            setFoodName("")
            setFoodDesc("")
            setMealId(0);
            setFoods([]);
        }
        setOpen10(!open10);
    };


    const openMealUpdate = (data) => {
        setMealId(data.id);
        setMealName(data.title);
        setMealDesc(data.description);
        setFoods(data.meals);
        setOpen10(!open10);
    }

    const deleteMeal = (id) => {
        API.deleteMealPlan(id).then(r => {
            console.log(r);
            if (r.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Meal plan deleted successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                getMealPlans();
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

    const createMealPlan = () => {
        API.createMealPlan(mealName, mealDesc, foods).then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Meal plan created successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setMealName("")
                    setMealDesc("")
                    setFoodName("")
                    setFoodDesc("")
                    setFoods([]);
                    handleClose10();
                    getMealPlans();
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


    const getMealPlans = () => {
        API.getMealPlan().then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
                    setMeals(r.data.body)
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

    const addFoodList = () => {
        let food = {
            id: 0,
            meal_name: foodName,
            description: foodDesc
        }
       let newFoods =  [...foods];
        newFoods.push(food);
        setFoods(newFoods);
    }

    const updateMealPlan = () => {
        API.updateMealPlan(mealId, mealName, mealDesc, foods).then(r => {
            console.log(r);
            if (r.success) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Meal plan created successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setMealName("")
                setMealDesc("")
                setFoodName("")
                setFoodDesc("")
                setFoods([]);
                handleClose10();
                getMealPlans();
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
        getMealPlans();
    }, [])

    return (
        <div>

            <Dialog
                open={open10}
                onClose={handleClose10}
                scroll={scroll10}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">{mealId>0 ? 'Update meal plan' : 'Create new meal plans'}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <Box sx={{marginTop: '10px'}}>
                        <TextField type="text" id="filled-basic" label="Meal Plan Name" variant="filled"
                                   sx={{width: '100%'}} value={mealName} onChange={e => setMealName(e.target.value)}/>
                    </Box>

                    <Box sx={{marginTop: '10px'}}>
                        <div className={'post-description'}>
                            <TextField
                                placeholder="Enter Meal Plan description"
                                multiline
                                rows={5}
                                maxRows={4}
                                value={mealDesc}
                                onChange={e => setMealDesc(e.target.value)}
                            />
                        </div>
                    </Box>

                    <Box sx={{marginTop: '10px', minWidth: '500px'}}>
                        <section>
                            <div className={'added-food'}>
                                {
                                    foods.map(r =>
                                        <div className={'food'}>
                                            <div>{r.meal_name}</div>
                                            <p>{r.description}</p>
                                            <div style={{textAlign: 'end'}}><Button variant={'text'} sx={{color: 'red'}}>Delete</Button></div>
                                        </div>
                                    )
                                }

                            </div>
                            <div className={'food-enter'}>

                                <h3>Add New Meal</h3>

                                <Box sx={{marginTop: '10px'}}>
                                    <TextField type="text" id="filled-basic" label="New Food Item" variant="filled"
                                               sx={{width: '100%'}} onChange={e => setFoodName(e.target.value)}/>
                                </Box>

                                <Box sx={{marginTop: '10px'}}>
                                    <div className={'post-description'}>
                                        <TextField
                                            placeholder="Enter food inte description"
                                            multiline
                                            rows={2}
                                            maxRows={4}
                                            onChange={e => setFoodDesc(e.target.value)}
                                        />
                                    </div>
                                </Box>

                                <div style={{marginTop: '10px'}}>
                                    <Button variant={'outlined'} sx={{width: '100%'}}
                                        onClick={addFoodList}
                                    >Add</Button>
                                </div>
                            </div>
                        </section>
                    </Box>

                    <div style={{textAlign: 'end', marginTop: '20px'}}>
                        <Button variant={'contained'}
                            onClick={mealId>0 ? updateMealPlan : createMealPlan}
                        >{mealId>0 ? 'Update' : 'Publish'}</Button>
                    </div>

                </DialogContent>
            </Dialog>


            <Header/>
            <section className={'common-content'}>
                <CreateMealBar update={handleClose10}/>
                <section>


                    {
                        meals.map(m =>  <ProfileMealCard data={m} deleteMeal={deleteMeal} openUpdate={openMealUpdate}/>)
                    }

                </section>
            </section>

        </div>
    )

}

export default Meal;