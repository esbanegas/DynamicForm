import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ManageQuestionsAnswers } from "./containers/ManageQuestionsAnswers";
import { Polls } from "./containers/Polls";

import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f06292",
    },

    

    background: "#cfd8dc",
  },
});

const App = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Polls />
            {/* <ManageQuestionsAnswers/> */}
          </div>
        </ThemeProvider>
        <ToastContainer style={{ zIndex: '2147483647' }} />
    </div>

    
  );
};

export default App;
