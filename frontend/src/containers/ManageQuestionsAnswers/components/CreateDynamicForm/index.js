import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import { TextField, makeStyles, Grid } from "@material-ui/core";
import { ButtonPrimary } from "../../../../controls/Button";
import { ListControl } from "../../../../controls/List";
import { utils } from "../../../../utils";
import { AddControl } from "../AddControls";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "1rem",
    height: '100%'
  },

  paper: {
    padding: theme.spacing(1),
  },

  textField: {
    fontSize: "10rem",
  },
}));

export const CreateDynamicForm = () => {
  const [isAddBlock, setIsAddBlock] = useState(false);
  const [form, setForm] = useState();
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});

  const classes = useStyles();

  const handleAddBlock = () => {
    setIsAddBlock(true);
    setSections([...sections, { sectionTitle: "Add Section" }]);
  };

  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const handleSelectedSection = (section) => setSelectedSection(section);

  const handleSectionTitleBlur = (item) => (event) => {
    const sectionIndex = sections.findIndex(
      (s) => s.sectionTitle === item.sectionTitle
    );

    const sectionsCopy = utils.copyOf(sections);

    sectionsCopy[sectionIndex].sectionTitle = event.target.value;
    setSections(sectionsCopy);
    setSelectedSection(sectionsCopy[sectionIndex]);
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
              onChange={handleChange("title")}
            />
          </div>

          <div className={classes.paper}>
            <TextField
              fullWidth
              id="form-description"
              label="Form Description"
              variant="outlined"
              onChange={handleChange("description")}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <ButtonPrimary
            label="Add Section"
            startIcon={<AddIcon />}
            onClick={handleAddBlock}
          />
        </Grid>

        {utils.evaluateArray(sections) && (
          <Grid item xs={12}>
            <ListControl
              items={sections}
              onRenderItem={onRenderSection}
              onSelectedItem={handleSelectedSection}
            />

            <AddControl
              selectedSection={selectedSection}
              setSections={setSections}
              sections={sections}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};
