import React, { useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { CheckboxControl } from "../../controls/Checkbox";
import { DynamicForm } from "../../controls/DynamicForm";

import { PollQuestionnaire } from "./components/PollQuestionnaire";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    width: "40rem",
    padding: "1rem",
    overflow: 'auto'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.secondary,
  },
}));

export const Polls = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PollQuestionnaire />
          
        </Grid>
      </Grid>
    </div>
  );
};
