import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import './App.css';
import Main from "./components/Main";



function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </Router>
  );
}

export default App;
