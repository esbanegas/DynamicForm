import React, { useState } from "react";
import { Grid, makeStyles, Tabs, Tab, Box,Typography } from "@material-ui/core";
import { PollQuestionnaire } from "./components/PollQuestionnaire";
import { PollsAnswered } from "./components/PollsAnswered";

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
    
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const Polls = () => {

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>

            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="polls"
            >
              <Tab label="Forms To Answer"/>
              <Tab label="Forms answered"/>
            </Tabs>
          
        <TabPanel value={value} index={0} >
          <PollQuestionnaire />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <PollsAnswered />
        </TabPanel>
          
        </Grid>
      </Grid>
    </div>
  );
};
