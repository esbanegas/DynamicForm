import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import { TextField, makeStyles, Grid, Paper } from "@material-ui/core";
import { ButtonPrimary } from "../../../../controls/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "1rem",
  },

  paper: {
    padding: theme.spacing(1),
  },
}));

export const CreateDynamicForm = () => {
  const [isAddBlock, setIsAddBlock] = useState(false);

  const classes = useStyles();

  const handleAddBlock = () => {
    setIsAddBlock(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <TextField
              fullWidth
              id="form-title"
              label="Form Title"
              variant="outlined"
            />
          </div>

          <div className={classes.paper}>
            <TextField
              fullWidth
              id="form-description"
              label="Form Description"
              variant="outlined"
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <ButtonPrimary
            label="Add Block"
            startIcon={<AddIcon />}
            onClick={handleAddBlock}
          />
        </Grid>

        {isAddBlock && (
          <Grid item xs={12}>
            <div>Block 1</div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
