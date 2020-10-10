import React from "react";
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
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Polls /> */}
        <ManageQuestionsAnswers/>
      </div>
    </ThemeProvider>
  );
};

export default App;
