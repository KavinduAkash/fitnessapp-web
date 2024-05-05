import React from 'react';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import DefaultTheme from "./theme/default-theme";
import {useRoutes} from "react-router-dom";
import './App.css'
import './fonts.css'
import Home from "./views/home.jsx";
import Profile from "./views/profile.jsx";
import Signup from "./views/signup";
import Signin from "./views/signin";
import User from "./views/user";
import Meal from "./views/meal.jsx";

const appr = [
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/signin",
    element: <Signin/>,
  },
  {
    path: "/friends",
    element: <User/>,
  },
  {
    path: "/profile/:idx",
    element: <Profile/>,
  },
  {
    path: "/meal",
    element: <Meal/>,
  },
]

function App() {
  // const appRoutes = useRoutes(routes);
  const appRoutes = useRoutes(appr);
  return (
    <ThemeProvider theme={DefaultTheme}>
        {appRoutes}
    </ThemeProvider>
  )
}

export default App
