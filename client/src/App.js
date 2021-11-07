import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';



function App() {

  return (
    <Router>
       <ThemeProvider theme={theme}>

        <Routes>
          <Route path='/login' element={<Login/>} />
        </Routes>

      </ThemeProvider>

    </Router>
  );
}

export default App;
