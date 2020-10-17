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
  Select,
  InputLabel 
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CardControl from "../../../../controls/Card";
import { ListControl } from "../../../../controls/List";
import { utils } from "../../../../utils";
import { restClient } from "./../../../../services/restClient";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../../controls/Button";
import { Save } from "@material-ui/icons";

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
  select:{
    width: "100%",
  }
}));

export const PollQuestionnaire = () => {
  const [form, setForm] = useState();
  
  const [listFormId, setListFormId]= useState([]);

  const [userId, setUserId] = useState('');
  
  const classes = useStyles();

  useEffect(() => {
        fetchListForms();
  }, []);

  const fetchListForms = async () => {
    const request = {
    
    };
    const response = await restClient.httpGet("/Forms/list-formsId", request);

    if (utils.hasErrorResponse(response)) {
      return;
    }
    if (!utils.evaluateArray(response)) {
      toast.warn("Forms was not found !!");
      return;
    }
    setListFormId(response);
    const firstFormId = response[0];
    fetchSelectedForm(firstFormId);
  };

  
  const fetchSelectedForm = async (formId) => {
    const request = {
      formId: formId,
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
    setForm(firstForm);
    
  };

  const handleOnChangeFormId = (event) => {
    const value = event.target.value;
    fetchSelectedForm(value);
  };

  const handleOnChangeUserId = (event) => {
    const value = event.target.value;
    setUserId(value);
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
        return buildCheckBoxOptions(question,question.answers);

      case "textField":
        return buildTextFieldOption(question,question.answers);

      case "radioButton":
        return buildRadioButtonOption(question, question.answers);

      default:
        return <div />;
    }
  };

  const buildCheckBoxOptions = (question, answers) => {
    if (utils.evaluateArray(answers)) {
      return answers.map((a) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name={a.answerDescription} />}
                          label={a.answerDescription}
                          //checked={a.selectedValue}
                          onChange={handleOnChangeCkeckBox(a,question)}
              />
            </Grid>
          </Grid>
        );
      });
    }
  };

  const handleOnChangeTextField = (item, question) => (event) => {
    
    let selectedSection = form.sections.find(f=>f.sectionId === question.formSectionId);
    
    const selectedQuestion = selectedSection.questions.find(f=>f.formQuestionId === item.formQuestionId);
    if(utils.evaluateObject(selectedQuestion)){

      const selectedAnswer = selectedQuestion.answers.find(f=>f.formAnswerId === item.formAnswerId);
      selectedAnswer.selectedValue = event.target.value;
    }
    const copyForm = {...form}
    setForm(copyForm);
  };

  const handleOnChangeCkeckBox = (item, question) => (event) => {
    
    let selectedSection = form.sections.find(f=>f.sectionId === question.formSectionId);
    
    const selectedQuestion = selectedSection.questions.find(f=>f.formQuestionId === item.formQuestionId);
    if(utils.evaluateObject(selectedQuestion)){

      selectedQuestion.answers.forEach(element => {
        if (element.formAnswerId === item.formAnswerId) {
          element.selectedValue = event.target.checked;
        } 
      });
    }
    const copyForm = {...form}
    setForm(copyForm);
  };

 

  const buildRadioButtonOption = (question, answers) => {
      question.radioButtonValue ='';
    return answers.map((item, index) => {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options"
                name="option-control"
                onChange={handleOnSelectedRadioButton(item, question)}
              >
                
                <FormControlLabel
                  key={index}
                  value={item.formAnswerId}
                  control=
                  {<Radio  checked={item.selectedValue ==='1'}/>}
                  label={item.answerDescription}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      );
    });
  };

  const handleOnSelectedRadioButton = (item, question) => (event) => {
    debugger;
    let selectedSection = form.sections.find(f=>f.sectionId === question.formSectionId);
    const selectedQuestion = selectedSection.questions.find(f=>f.formQuestionId === item.formQuestionId);
    if(utils.evaluateObject(selectedQuestion)){
      
      const selectedValue = event.target.value;

      selectedQuestion.answers.forEach(element => {
        if (element.formAnswerId.toString() === selectedValue) {
          element.selectedValue = "1";
        } else{
          element.selectedValue = "";
        }
      });
    }
    const copyForm = {...form}
    setForm(copyForm);
  };

  const handleOnSavePoll= async ()=>{
    
    if(!utils.evaluateObject(form)){
      toast.warn("Select a form to answer");
      return;
    }
    form.userId = userId;
    const request = {
      form: form,
    };
    const response = await restClient.httpPost("/Polls", request);
    
    if (response) {
      toast.warn(response);
      return;
    }
    toast.success("Data saved successfully");
    setForm({});
  }

  const buildTextFieldOption = (question, answers) => {
    if (utils.evaluateArray(answers)) {
      return answers.map((a) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <TextField
              id='poll-question'
              multiline
              rowsMax={4}
              placeholder={a.answerDescription}
              value={a.selectedValue}
              onBlur={handleOnChangeTextField(a,question)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>
          </Grid>
        );
      });
    }
  };

  const buildSection=(section)=>{
    return <div>
          <CardControl  title={section.sectionTitle}>
          {      section.questions &&
                section.questions.map((question) => {
                  return evaluateQuestionControl(question);
                })}
          </CardControl>
                 
          </div>;
            
    
      
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

      <Grid item xs={12}>
          <div className={classes.paper}>
            <TextField
              fullWidth
              id="form-userId"
              label="UserId"
              placeholder="Enter your user Id"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={userId}
              onChange={handleOnChangeUserId}
            />
          </div>

          <div className={classes.paper}>
          <FormControl variant="outlined" className={classes.select}  InputLabelProps={{
                  shrink: true,
                }}>
            <InputLabel shrink >Form Title</InputLabel>
              <Select
                native
                onChange={handleOnChangeFormId}
                inputProps={{
                  name: 'form-title',
                  id: 'form-title',
                }}  
               >
                  {listFormId && listFormId.map(f=>{
                    return <option value={f.formId}>{f.title}</option>
                  })}
              </Select>
          </FormControl>
          </div>
        </Grid>

        <Grid item xs={12}>
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
              //onChange={handleChange("description")}
            />
          </div>
        </Grid>

     
          <Grid item xs={12}>

          {form && form.sections &&
                form.sections.map(section=> {
                  return buildSection(section)
                })
            }
           <ButtonPrimary
            startIcon={<Save/>}
            label='save'
            onClick={handleOnSavePoll}
          />
           
          </Grid>
      </Grid>
    </div>
  );
};
