import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../assets/fitness-social-logo.png';
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AppBarTheme from "../theme/appbar-theme.js";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../utils/const.js";

const pages = [
    {
        lbl: "Feeds",
        path: "/"
    },
    {
        lbl: "Friends",
        path: "/friends"
    },
    {
        lbl: "Meal Plans",
        path: "/meal"
    },
    {
        lbl: "Workout Plans",
        path: "/workout"
    }
];
const settings = [
    {
        lbl: "Account",
        path: "/profile"
    },
    {
        lbl: "Logout",
        path: "/logout"
    }
];

function Header() {

    const navigate = useNavigate();

    // --------------------- header ---------------------
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        navigate(path);
    };

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/signin");
    }

    const handleCloseUserMenu = (path) => {
        path === "/logout" ?
            logout() :
            navigate(path);
    };
    // --------------------- header ---------------------


    return (
        <div>
            {/*Header*/}
            <ThemeProvider theme={AppBarTheme}>
                <AppBar position="static">
                    <Container maxWidth="sm">
                        <Toolbar disableGutters>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <img src={Logo} alt="" width={100}/>
                            </Box>

                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page.lbl} onClick={() => handleCloseNavMenu(page.path)}>
                                            <Typography textAlign="center"
                                                        sx={{color: '#000000'}}>{page.lbl}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>


                            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                                <img src={Logo} alt="" width={100}/>
                            </Box>

                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    display: {xs: 'flex', md: 'none'},
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >

                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'center'}}>
                                {pages.map((page) => (
                                    <Button
                                        key={page.lbl}
                                        onClick={() => handleCloseNavMenu(page.path)}
                                        sx={{my: 2, color: 'black', display: 'block'}}
                                    >
                                        {page.lbl}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.lbl} onClick={() => handleCloseUserMenu(setting.path)}>
                                            <Typography textAlign="center">{setting.lbl}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>

        </div>
    )
}

export default Header;