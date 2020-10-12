import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Grid,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CardControl from "../../../../controls/Card";
import { ListControl } from "../../../../controls/List";
import { utils } from "../../../../utils";
import { restClient } from "./../../../../services/restClient";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../../controls/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "1rem",
  },

  paper: {
    padding: theme.spacing(1),
  },
  //

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
    const fetchData = async () => {
      const request = {
        formId: 1,
      };
      const response = await restClient.httpGet("/Forms", request);

      if (utils.hasErrorResponse(response)) {
        return;
      }
      if (!utils.evaluateArray(response)) {
        toast.warn("Form was not found !!");
        return;
      }

      const firstForm = response[0];
      const section = firstForm.sections;
      setForm(firstForm);
      setSections(section);
    };

    fetchData();
  }, []);

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
  };

  function evaluateQuestionControl(question) {
    const questionJsx = (
      <TextField  variant="outlined" value={question.questionDescription}
                InputProps={{
                  readOnly: true,}} />
    );
    const detailAnswers = getDetailAnswers(question);
    return (
      <div>
        {questionJsx}
        {detailAnswers}
      </div>
    );
  }

  const getDetailAnswers = (question) => {
    switch (question.answerType) {
      case "checkBox":
        return buildCheckBoxOptions(question.answers);

      case "textField":
        return buildTextFieldOption(question.answers);

      case "radioButton":
        return buildRadioButtonOption(question.answers);

      default:
        return <div />;
    }
  };

  const buildCheckBoxOptions = (answers) => {
    if (utils.evaluateArray(answers)) {
      return answers.map((a) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked name="checkedA" />}
                label={a.answerDescription}
              />
            </Grid>
          </Grid>
        );
      });
    }
  };

  const buildRadioButtonOption = (answers) => {
    return answers.map((item, index) => {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options"
                name="option-control"
                value={item.answerDescription}
                onChange={handleChange}
              >
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={item.answerDescription}
                  // onClick={handleEditOption(index)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      );
    });
  };

  const buildTextFieldOption = (answers) => {
    if (utils.evaluateArray(answers)) {
      return answers.map((a) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <TextField
              id='poll-question'
              label="Multiline"
              multiline
              rowsMax={4}
              value={a.answerDescription}
              //onChange={handleChange}
            />
            </Grid>
          </Grid>
        );
      });
    }
  };

  const renderActions =[{
      label: 'save',
      startIcon:  <SaveIcon/>,
      
    }];

  const onRenderSection = (item) => (
    <TextField
      className={classes.textField}
      fullWidth
      value={item && item.sectionTitle}
      id="form-title"
      variant="outlined"
      placeholder=""
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

            <CardControl title="Questions"
            actions={renderActions}
            >
              {selectedSection &&
                selectedSection.questions &&
                selectedSection.questions.map((question) => {
                  return evaluateQuestionControl(question);
                })}
            </CardControl>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
