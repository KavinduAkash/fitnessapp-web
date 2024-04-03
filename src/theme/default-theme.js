import {createTheme} from "@mui/material";

/*
colors
------
main-green: #83a31a
main-yellow: #FFDC2A
secondary-green: #b9db2f
main-gray: #edf2ff

*/

const DefaultTheme = createTheme({
    palette: {
        primary: {
            main: '#145392',
        },
        secondary: {
            main: '#d7e6f2',
        },
        btnColor: {
            white: '#145392',
            black: '#53aced',
        },
        subText: {
            main: '#437db0'
        }
    },
    typography: {
        "fontFamily": `"Montserrat", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        button: {
            textTransform: 'none'
        },
        AppBar: {}
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#edf2ff',
                }
            }
        }
    }
});

export default DefaultTheme;
