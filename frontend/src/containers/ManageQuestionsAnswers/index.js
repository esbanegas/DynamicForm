import React, { useState } from "react"

import { Grid, makeStyles, Paper } from "@material-ui/core";

import {
  ButtonPrimary,
  ButtonSecundary,
  ButtonUploadImage,
} from "../../controls/Button";
import { CheckboxControl } from "../../controls/Checkbox";
import { DynamicForm } from "../../controls/DynamicForm";
import { data } from "./data";
import { CreateDynamicForm } from "./components/CreateDynamicForm";

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

export const ManageQuestionsAnswers = () => {
  const [items, setItems] = useState(data);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateDynamicForm />

          {/* <DynamicForm form={data.form1} /> */}
        </Grid>
      </Grid>
    </div>
  );
};
