import React, { useState, useEffect } from "react";
import { TextField, makeStyles, Grid } from "@material-ui/core";
import { ListControl } from "../../../../controls/List";
import { utils } from "../../../../utils";
import { AddControl } from "../AddControls";
import {restClient} from './../../../../services/restClient'
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "1rem",
  },

  paper: {
    padding: theme.spacing(1),
  },

  textField: {
    fontSize: "10rem",
  },
}));

export const PollQuestionnaire = () => {

  const [form, setForm] = useState();
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});

  const classes = useStyles();

  useEffect(() => {
    debugger;
    const fetchData = async () => {
      const request ={
        formId: 6
      }
      const response = await restClient.httpGet('/Forms',request );
        
      if (utils.hasErrorResponse(response)) {
          return;
      }
      if(!utils.evaluateArray(response)){
        toast.warn("Form was not found !!");
      }

      debugger;
       const firstForm = response[0];
       const section = firstForm.sections;
       setForm(firstForm);
       setSections(section);
  }

  fetchData();


}, []);



  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleSelectedSection = (section) => setSelectedSection(section);

  const handleSectionTitleBlur = (item) => (event) => {
    debugger;
    const sectionIndex = sections.findIndex(
      (s) => s.sectionTitle === item.sectionTitle
    );
    const sectionsCopy = utils.copyOf(sections);

    sectionsCopy[sectionIndex].sectionTitle = event.target.value;
    setSections(sectionsCopy);
  };

  const onRenderSection = (item) => (
    <TextField
      className={classes.textField}
      fullWidth
      id="form-title"
      variant="outlined"
      placeholder="Description Section"
      onBlur={handleSectionTitleBlur(item)}
    />
  );

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
              InputLabelProps={{
                shrink: true,
              }}
              value={form && form.title}
              onChange={handleChange("title")}
            />
          </div>

          <div className={classes.paper}>
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              fullWidth
              id="form-description"
              label="Form Description"
              value={form && form.description}
              variant="outlined"
              onChange={handleChange("description")}
            />
          </div>
        </Grid>

        {utils.evaluateArray(sections) && (
          <Grid item xs={12}>
            <ListControl
              items={sections}
              onRenderItem={onRenderSection}
              onSelectedItem={handleSelectedSection}
            />

           
          </Grid>
        )}
      </Grid>
    </div>
  );
};
