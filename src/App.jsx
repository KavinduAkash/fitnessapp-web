import ThemeProvider from "@mui/material/styles/ThemeProvider";
import DefaultTheme from "./theme/default-theme";
import './App.css'
import Home from './views/home.jsx';

function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
        <Home/>
    </ThemeProvider>
  )
}

export default App
