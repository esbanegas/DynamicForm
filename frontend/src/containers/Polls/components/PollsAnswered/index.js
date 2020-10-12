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
import { restClient } from "../../../../services/restClient";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../../controls/Button";
import SearchIcon from '@material-ui/icons/Search';

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
  },
  searchUserButton:{
    width:"100%"
  }
  
}));

export const PollsAnswered = () => {
  const [poll, setPoll] = useState();
  
  const [listPollsId, setListPollId]= useState([]);

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});
  
  const [userId, setUserId] = useState('');
  
  const classes = useStyles();


  useEffect(() => {
    
    console.log(selectedSection);
}, [selectedSection]);

   
  const fetchSelectedPoll = async (pollId) => {
    const request = {
      pollId: pollId,
    };
    const response = await restClient.httpGet("/Polls", request);

    if (utils.hasErrorResponse(response)) {
      return;
    }
    if (!utils.evaluateArray(response)) {
      toast.warn("Poll was not found !!");
      return;
    }

    const firstPoll = response[0];
    const sections = firstPoll.sections;
    const firstSection = sections[0];
    setPoll(firstPoll);
    setSections(sections);
    setSelectedSection(firstSection);
  };

  function hanldeChecked(selectedValue){
    debugger;
    return selectedValue ==="true";
  }

  const onSearchUser = async () => {
    const request = {
      userId: userId
    };
    const response = await restClient.httpGet("/Polls/pollsId-by-user", request);

    if (utils.hasErrorResponse(response)) {
      return;
    }
    if (!utils.evaluateArray(response)) {
      toast.warn("Polls for selected user was not found");
      return;
    }

    setListPollId(response);
    fetchSelectedPoll(response[0]);
 
  };

  const handleOnChangeFormId = (event) => {
    const value = event.target.value;
    fetchSelectedPoll(value);
  };

  const handleOnChangeUserId = (event) => {
    const value = event.target.value;
    setUserId(value);
  };

  const handleSelectedSection = (section) => setSelectedSection(section);

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
        return buildRadioButtonOption(question, question.answers);

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
                control={<Checkbox name={a.answerDescription} />}
                          label={a.answerDescription}
                          checked={hanldeChecked(a.selectedValue)}
                          onChange={handleOnChangeCkeckBox(a)}
              />
            </Grid>
          </Grid>
        );
      });
    }
  };

  const handleOnChangeTextField = (item) => (event) => {
    
    const selectedQuestion = selectedSection.questions.find(f=>f.formQuestionId === item.formQuestionId);
    if(utils.evaluateObject(selectedQuestion)){

      const selectedAnswer = selectedQuestion.answers.find(f=>f.formAnswerId === item.formAnswerId);
      selectedAnswer.selectedValue = event.target.value;
    }
    const copySection = {...selectedSection };
    setSelectedSection(copySection);
    console.log(copySection);
  };

  const handleOnChangeCkeckBox = (item) => (event) => {
    
    const selectedQuestion = selectedSection.questions.find(f=>f.formQuestionId === item.formQuestionId);
    if(utils.evaluateObject(selectedQuestion)){

      selectedQuestion.answers.forEach(element => {
        if (element.formAnswerId === item.formAnswerId) {
          element.selectedValue = event.target.checked;
        } 
      });
    }
    const copySection = {...selectedSection };
    setSelectedSection(copySection);
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
                onChange={handleOnSelectedRadioButton(item)}
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

  const handleOnSelectedRadioButton = (item) => (event) => {
    
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
    const copySection = {...selectedSection };
    setSelectedSection(copySection);
  };

  const handleOnSavePoll= async ()=>{
    
    if(!utils.evaluateObject(poll)){
      toast.warn("Select a poll to answer");
      return;
    }
    poll.userId = userId;
    const request = {
      poll: poll,
    };
    const response = await restClient.httpPost("/Polls", request);

    if (utils.hasErrorResponse(response)) {
      return;
    }
    toast.success("Data saved successfully");
    setPoll({});
    
  }

  const buildTextFieldOption = (answers) => {
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
              onBlur={handleOnChangeTextField(a)}
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

  const renderActions =[{
      label: 'save',
      startIcon:  <SaveIcon/>,
      onClick: handleOnSavePoll
      
    }];

  const onRenderSection = (item) => (
    <TextField
      className={classes.textField}
      fullWidth
      value={item && item.sectionTitle}
      id="poll-title"
      variant="outlined"
      placeholder=""
    />
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

      <Grid item xs={12}>
          <div className={classes.paper}>
          <Grid container xs={12}>
            <Grid item xs={8}>
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
            </Grid>
            <Grid item xs={4} >
            <div className="SearchButton" style={{paddingTop:"5%"}} >
            <ButtonPrimary  startIcon= {<SearchIcon/>}
            label= ""
            onClick={onSearchUser}
            className={classes.textField}
            />
            </div>
            
            </Grid>
            
          </Grid>
         
          </div>

          <div className={classes.paper}>
          <FormControl variant="outlined" className={classes.select}  InputLabelProps={{
                  shrink: true,
                }}>
            <InputLabel shrink >FormId</InputLabel>
              <Select
                native
                onChange={handleOnChangeFormId}
                inputProps={{
                  name: 'formId',
                  id: 'formId',
                }}  
               >
                  {listPollsId && listPollsId.map(f=>{
                    return <option value={f}>{f}</option>
                  })}
              </Select >
          </FormControl>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className={classes.paper}>
            <TextField
              fullWidth
              id="poll-title"
              label="Form Title"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}

              value={poll && poll.title}
              //onChange={handleChange("title")}
            />
          </div>

          <div className={classes.paper}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              id="poll-description"
              label="Form Description"
              value={poll && poll.description}
              variant="outlined"
              //onChange={handleChange("description")}
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
