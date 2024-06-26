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

import {styled} from '@mui/material/styles';
import {Autocomplete, Box, FormControl, Grid, InputLabel, TextField} from "@mui/material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

import * as API from "../service/api";

import * as AgeFinder from "../utils/agefinder";
import Swal from "sweetalert2";
import ProfilePostCard from "../components/profile-post-card.jsx";
import ProfileMealCard from "../components/profile-meal-card.jsx";
import ProfileWorkoutCard from "../components/profile-workout-card.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Friend from "../components/friend.jsx";

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../utils/const.js";
import HomePostCard from "../components/home-post-card.jsx";
import {getFile} from "easy-file-picker";

import Comment from "../components/comment.jsx";
import ReactPlayer from "react-player";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {getMyWorkouts, updateWorkoutPlan} from "../service/api";

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

    const navigate = useNavigate();
    const {idx} = useParams();

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
    const [myProfile, setMyProfile] = useState(false);
    const [isFollower, setIsFollower] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    // profile detail modal
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    // followers detail modal
    const [openf, setOpenf] = React.useState(false);
    const [scrollf, setScrollf] = React.useState('paper');

    const [startDate, setStartDate] = useState(new Date());


    const [uFirstName, setUFirstName] = useState("");
    const [uLastName, setULastName] = useState("");
    const [uDob, setUDOB] = useState("");
    const [uGender, setUGender] = useState("");
    const [uImage, setUImage] = useState(null);
    const [uFile, setUFile] = useState(null);

    const [contentType, setContentType] = useState(1);

    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");


    // -------- POST---------
    const [open5, setOpen5] = React.useState(false);
    const [scroll5, setScroll5] = React.useState('paper');

    const [open2, setOpen2] = React.useState(false);
    const [scroll2, setScroll2] = React.useState('paper');

    const [open3, setOpen3] = React.useState(false);
    const [scroll3, setScroll3] = React.useState('paper');
    const [video, setVideo] = React.useState('');

    const [open4, setOpen4] = React.useState(false);
    const [scroll4, setScroll4] = React.useState('paper');

    const [images, setImages] = React.useState([]);
    const [note, setNote] = React.useState("");

    const [imagesu, setImagesu] = React.useState([]);
    const [noteu, setNoteu] = React.useState("");
    const [postIdu, setPostIdu] = React.useState(0);

    const [posts, setPosts] = React.useState([]);
    const [currentPost, setCurrentPost] = React.useState(null);

    // ------- meal ---------

    const [open10, setOpen10] = React.useState(false);
    const [scroll10, setScroll10] = React.useState('paper');

    const [mealId, setMealId] = useState(0);

    const [meals, setMeals] = useState([]);

    const [mealName, setMealName] = useState("");
    const [mealDesc, setMealDesc] = useState("");

    const [foodName, setFoodName] = useState("");
    const [foodDesc, setFoodDesc] = useState("");

    const [foods, setFoods] = useState([]);

    // ------ workout ------
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

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const loadMyProfile = () => {
        API.getMyProfileDetails().then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
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
                    setMyProfile(true);

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

    const loadProfile = () => {
        API.getProfileDetails(idx).then(r => {
            console.log(r);
            if (r.success) {
                if (r.data.success) {
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
                    setMyProfile(false);

                    setIsFollower(r.data.body.follower);
                    setIsFollowing(r.data.body.following);

                    if (r.data.body.myProfile) {
                        setUFirstName(r.data.body.firstName);
                        setULastName(r.data.body.lastName);
                        setUDOB(new Date(r.data.body.dob));
                        setUGender(r.data.body.gender);
                        setMyProfile(true);
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

    const followUser = (follow) => {
        API.followUser(idx, follow).then(r => {
            loadProfile();
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
            const blob = new Blob([file], {type: file.type}); // Convert file to Blob
            const url = URL.createObjectURL(blob); // Generate Blob URL
            console.log("image2: ", url);
            setUFile(file);
            setUImage(url);
        }
    }

    const updateProfile = () => {
        if (uImage) {
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

    const resetPassword = () => {
        if (password === confirmedPassword) {
            API.resetPassword(password).then(r => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your password is reset successfully! Please sign in again",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/signin");
            }).catch(e => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Sorry!, something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Passwords are not matching",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    const handleClose = (type) => {
        if (type === "PASSWORD_RESET") {
            resetPassword();
        } else if (type === "UPDATE") {
            updateProfile();
        } else {
            setOpen(!open);
        }
    };

    const deleteAccount = () => {

        Swal.fire({
            title: "Are you sure to delete your account?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                API.deleteAccount().then(r => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your account deleted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    navigate("/signup");
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
        });
    }

    const handleClosef = (type) => {

    };


    const handleContentType = (type) => {
        setContentType(type);
    }


    // ------ POST ------
    const getPosts = () => {
        API.getMyPosts().then(r => {
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

    // const handleClose = () => {
    //     setOpen(!open);
    // };

    const handleClose2 = () => {
        setOpen2(!open2);
    };

    const handleClose3 = () => {
        setOpen3(!open3);
    };

    const handleClose4 = () => {
        setOpen4(!open4);
    };

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

    const uploadFileu = async () => {
        const filex = await getFile();
        let img = imagesu;
        setImagesu([...img, filex])

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

    const removeFileu = (index) => {
        let img = imagesu;
        img.splice(index, 1);
        setImagesu([...img])
    }

    const setPostUpdateData = (data) => {
        setPostIdu(data.id);
        setImagesu(data.images);
        setNoteu(data.note);
        setOpen4(true);
    }

    const createPost = () => {
        API.createPost({files: images, note: note}).then(r => {
            if (r.data.success) {
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

    const openVideo = (video) => {
        setVideo(video);
        setOpen3(true);
    }

    const handleClose10 = () => {
        if (open) {
            setMealName("")
            setMealDesc("")
            setFoodName("")
            setFoodDesc("")
            setFoods([]);
        }
        setOpen10(!open10);
    };


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

    const openMealUpdate = (data) => {
        setMealId(data.id);
        setMealName(data.title);
        setMealDesc(data.description);
        setFoods(data.meals);
        setOpen10(!open10);
    }
    const getMealMyPlans = () => {
        API.getMyMealPlan().then(r => {
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

    const getUserMealPlans = () => {
        API.getUserMealPlan(idx).then(r => {
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
        let newFoods = [...foods];
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

                if (idx) {
                    getUserMealPlans();
                } else {
                    getMealMyPlans();
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

                    if (idx) {
                        getWorkouts();
                    } else {
                        getMyWorkouts();
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

    const getMyWorkouts = () => {
        API.getMyWorkouts().then(r => {
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
                    if (idx) {
                        getWorkouts();
                    } else {
                        getMyWorkouts();
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
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please sign in",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/signin")
        }
        getEx();
        if (idx) {
            loadProfile();
            getUserMealPlans();
            getWorkouts();
        } else {
            loadMyProfile();
            getPosts();
            getMealMyPlans();
            getMyWorkouts();
        }
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
                <DialogTitle id="scroll-dialog-title">
                    <div style={{textAlign: "end"}}><span onClick={handleClose}>X</span></div>
                    Account Settings</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <form action="">

                        <section style={{marginBottom: '20px'}}>
                            <div style={{
                                background: `url(${image ? image : uImage ? uImage : UserVector})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                margin: 'auto'
                            }} className={'profile-edit-pic'}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
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
                                    <TextField id="filled-basic" value={uFirstName} label="First Name" variant="filled"
                                               onChange={e => setUFirstName(e.target.value)}/>
                                </Box>
                                <Box sx={{marginLeft: '2px'}}>
                                    <TextField id="filled-basic" value={uLastName} label="Last Name" variant="filled"
                                               onChange={e => setULastName(e.target.value)}/>
                                </Box>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField id="filled-basic" value={email} disabled label="Email" variant="filled"
                                           sx={{width: '100%'}}/>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginTop: '10px'
                            }}>
                                <Box sx={{flex: 1}}>
                                    <DatePicker class={"custom-datepicker"} selected={uDob}
                                                onChange={(date) => setUDOB(date)}/>
                                </Box>

                                <Box sx={{flex: 1}}>
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
                            <Button variant="contained" onClick={() => handleClose("UPDATE")}>Save Changes</Button>
                        </DialogActions>

                    </form>

                    <form action="">

                        <section>

                            <Box sx={{marginTop: '10px'}}>
                                <h3>Password Reset</h3>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField type="password" id="filled-basic" label="New Password" variant="filled"
                                           sx={{width: '100%'}} onChange={e => setPassword(e.target.value)}/>
                            </Box>

                            <Box sx={{marginTop: '10px'}}>
                                <TextField type="password" id="filled-basic" label="Confirm Password" variant="filled"
                                           sx={{width: '100%'}} onChange={e => setConfirmedPassword(e.target.value)}/>
                            </Box>

                        </section>

                        <DialogActions>
                            <Button variant="contained" onClick={() => handleClose("PASSWORD_RESET")}>Reset
                                Password</Button>
                        </DialogActions>

                    </form>

                    <form action="">

                        <section>
                            <Box sx={{marginTop: '10px'}}>
                                <h3>Delete Account</h3>
                                <Box>
                                    <p><span style={{color: 'red'}}>Warning: </span>Deleting your account will remove
                                        all your data permanently.</p>
                                </Box>
                            </Box>
                        </section>

                        <Box sx={{textAlign: 'start'}}>
                            <Button sx={{background: 'red'}} variant="contained" onClick={deleteAccount}>Delete My
                                Account</Button>
                        </Box>

                    </form>

                </DialogContent>
            </Dialog>

            <Dialog
                open={openf}
                onClose={handleClosef}
                scroll={scrollf}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Followers</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div className={'profile-followers-ribon'}>
                        <div className={'selected'}>Followings</div>
                        <div>Followers</div>
                    </div>

                    <div className={'profile-followers-content'}>

                        <Friend
                            image={'https://t3.ftcdn.net/jpg/05/09/38/68/240_F_509386837_KH6uEl5YptC272rHHof6z2zE4xXagww2.jpg'}
                            name={"Jhone white"}/>
                        <Friend
                            image={'https://t3.ftcdn.net/jpg/05/09/38/68/240_F_509386837_KH6uEl5YptC272rHHof6z2zE4xXagww2.jpg'}
                            name={"Jhone white"}/>
                        <Friend
                            image={'https://t3.ftcdn.net/jpg/05/09/38/68/240_F_509386837_KH6uEl5YptC272rHHof6z2zE4xXagww2.jpg'}
                            name={"Jhone white"}/>
                        <Friend
                            image={'https://t3.ftcdn.net/jpg/05/09/38/68/240_F_509386837_KH6uEl5YptC272rHHof6z2zE4xXagww2.jpg'}
                            name={"Jhone white"}/>
                        <Friend
                            image={'https://t3.ftcdn.net/jpg/05/09/38/68/240_F_509386837_KH6uEl5YptC272rHHof6z2zE4xXagww2.jpg'}
                            name={"Jhone white"}/>

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

            <Dialog
                open={open3}
                onClose={handleClose3}
                scroll={scroll3}
                aria-labelledby="scroll-dialog-title3"
                aria-describedby="scroll-dialog-description3"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">Video</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                    <div className={'post-video'}>
                        <ReactPlayer width={'100%'} url={video}/>
                    </div>

                </DialogContent>
            </Dialog>

            <Dialog
                open={open4}
                onClose={handleClose4}
                scroll={scroll4}
                aria-labelledby="scroll-dialog-title4"
                aria-describedby="scroll-dialog-description4"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">Edit post</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <div className={'image-dropper-container'}>
                        <button className={"image-dropper"} onClick={uploadFileu}
                                disabled={imagesu.length >= 4 ? true : false}>
                            <div className={"image-dropper-content"}>
                                <div>{`Select your media `}</div>
                                <PermMediaIcon/>
                                <div>{` ( ${imagesu.length}/4 )`}</div>
                            </div>
                        </button>
                    </div>

                    {imagesu.length > 0 && <div style={{margin: "10px 0px"}}>
                        <Grid container spacing={1}>
                            {
                                imagesu.map((file, index) => {
                                    console.log("tt: ", file.url)
                                    console.log("tt: ", typeof file)
                                    let fff = file.url ? file : URL.createObjectURL(file);
                                    // return <img src={URL.createObjectURL(file)} alt="" width={'100px'}/>
                                    return <Grid item xs={3} key={index}>
                                        <div style={{
                                            background: `url(${fff})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover'
                                        }} className={'image-block'}>
                                            {file.type === "video/mp4" &&
                                                <div className={'image-block-video'}><PlayCircleOutlineIcon/></div>}
                                            <div className={'image-block-remove'} onClick={() => removeFileu(index)}>
                                                <HighlightOffIcon/></div>
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
                            value={noteu}
                            onChange={e => setNoteu(e.target.value)}
                        />
                    </div>

                    <div style={{textAlign: 'end', marginTop: '20px'}}>
                        <Button variant={'contained'} onClick={createPost}>Update</Button>
                    </div>

                </DialogContent>
            </Dialog>


            <Dialog
                open={open10}
                onClose={handleClose10}
                scroll={scroll10}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                minWidth={"lg"}
            >
                <DialogTitle id="scroll-dialog-title">Update meal plans</DialogTitle>
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
                                            <div style={{textAlign: 'end'}}><Button variant={'text'}
                                                                                    sx={{color: 'red'}}>Delete</Button>
                                            </div>
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
                                onClick={updateMealPlan}
                        >Update</Button>
                    </div>

                </DialogContent>
            </Dialog>

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
            <section>
                {/*---- head ----  */}
                <section className={'profile-head'}>

                    <div
                        style={{
                            background: `url(${UserVector})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                        className={'profile-head-img'}>
                    </div>

                    <div className={'profile-head-title mukta-bold'}>
                        {firstName} {lastName} <span className={'profile-head-edit'}
                                                     style={myProfile ? {} : {display: 'none'}}
                                                     onClick={handleClickOpen('body')}><EditIcon
                        style={{fontSize: '13px'}}/>Edit</span>
                    </div>

                    <div className={'profile-head-data'}>

                        <div><span>Gender</span>{gender}</div>
                        <div><span>Age</span>{age}</div>
                        <div><span>Followers</span>200</div>
                        <div><span>Following</span>201</div>

                    </div>

                    {!myProfile && <div className={'follow-btn'}>

                        {isFollowing ?
                            <Button variant={'outlined'} onClick={() => followUser(false)}><GroupRemoveIcon/>
                                <div>Unfollow</div>
                            </Button> :
                            <Button variant={'contained'} onClick={() => followUser(true)}><GroupAddIcon/>
                                <div>Follow</div>
                            </Button>
                        }

                    </div>}

                </section>

                {/*---- content ----  */}
                <section className={'profile-content'}>
                    {/*---- content ribon ----  */}
                    <section className={'profile-content-ribon'}>
                        <div>
                            <div className={contentType == 1 && 'content-ribon-select'}
                                 onClick={() => handleContentType(1)}>Posts
                            </div>
                            <div className={contentType == 2 && 'content-ribon-select'}
                                 onClick={() => handleContentType(2)}>Meal Plans
                            </div>
                            <div className={contentType == 3 && 'content-ribon-select'}
                                 onClick={() => handleContentType(3)}>Worksouts
                            </div>
                        </div>
                    </section>
                    {/*---- content posts, meal plans, workspaces ----  */}
                    <section className={'profile-content-grid'}>

                        {
                            contentType == 1 ?

                                <section>
                                    {
                                        posts.map((post, index) => <HomePostCard data={post} openComments={openComments}
                                                                                 openVideo={openVideo}
                                                                                 updatePost={setPostUpdateData}/>)
                                    }
                                </section>

                                : contentType == 2 ?
                                    <section>


                                        {
                                            meals.map(m => <ProfileMealCard data={m} deleteMeal={deleteMeal}
                                                                            openUpdate={openMealUpdate}/>)
                                        }

                                    </section>
                                    :
                                    <section>
                                        {allWorkouts.map(r =>  <ProfileWorkoutCard data={r} openUpdate={openUpdateWorkout} deleteWorkout={deleteWorkout}/>)}
                                    </section>
                        }


                    </section>
                </section>
            </section>
        </div>
    )
}

export default Profile;