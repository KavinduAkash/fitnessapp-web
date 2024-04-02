import {Button} from "@mui/material";tiyoo
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import DefaultTheme from "./theme/default-theme";
import './App.css'

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
        <h1>Hello</h1>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
    </ThemeProvider>
  )
}

export default App
