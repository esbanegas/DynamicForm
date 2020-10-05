import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

import { data } from "../../containers/ManageQuestionsAnswers/data";
import { CheckboxControl } from "../Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    width: "40rem",
    padding: "1rem",
  },
  paper: {
    padding: theme.spacing(1),
    // color: theme.palette.text.secondary,
  },
}));

export const DynamicForm = ({ form }) => {
  const classes = useStyles();

  return (
    <div>
      {form.map((f) =>
        f.questions.map((s) => (
          <Paper className={classes.paper}>
            <span>{s.label}</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {s.options.map((option) => (
                <CheckboxControl label={option} />
              ))}
            </div>
          </Paper>
        ))
      )}
    </div>
  );
};
