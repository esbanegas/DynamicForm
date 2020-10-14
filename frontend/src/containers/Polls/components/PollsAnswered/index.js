import React, { useState, useEffect,useRef } from "react";
import { useReactToPrint } from 'react-to-print';
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
  InputLabel,
  IconButton
} from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import CardControl from "../../../../controls/Card";
import { ListControl } from "../../../../controls/List";
import { utils } from "../../../../utils";
import { restClient } from "../../../../services/restClient";
import { toast } from "react-toastify";
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

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  documentTitle: `${userId}-Forms`
});
   
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
    fetchSelectedPoll(response[0].pollId);
 
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
      <Grid container spacing={3} ref={componentRef} >

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
            <Grid item xs={2} >

            <IconButton color="secondary" aria-label="search user" onClick={onSearchUser}>
              <SearchIcon />
            </IconButton>
                      
            </Grid>
            <Grid item xs={2} >
            <IconButton color="secondary" aria-label="print" onClick={handlePrint}>
              <PrintIcon />
            </IconButton>
            
            </Grid>
            
          </Grid>
         
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
                  name: 'formId',
                  id: 'formId',
                }}  
               >
                  {listPollsId && listPollsId.map(f=>{
                    return <option value={f.pollId}>{f.title}</option>
                  })}
              </Select >
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
              id="poll-description"
              label="poll Description"
              value={poll && poll.description}
              variant="outlined"
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
