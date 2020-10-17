import React, { useState } from "react";

import { IconButton, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CardControl from "../../../../controls/Card";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ButtonPrimary } from "../../../../controls/Button";
import { RadioButtonTemplate } from "./templates/RadioButtonTemplate";
import { TextFieldTemplate } from "./templates/TextFieldTemplate";
import { CheckBoxTemplate } from "./templates/CheckBoxTemplate";
import { utils } from "../../../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    width: "100%",

    "&:hover": {
      border: ".5px solid gray",
    },
    // color: theme.palette.text.secondary,
  },
}));

export const AddControl = ({ selectedSection, sections, setSections }) => {
  const [questions, setQuestions] = useState(selectedSection.questions || []);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const classes = useStyles();

  const controls = [
    {
      text: "Option",
      key: "radioButton",
      icon: <RadioButtonCheckedIcon />,
    },
    {
      text: "Text",
      key: "textField",
      icon: <TextFieldsIcon />,
    },
    {
      text: "Checkbox",
      key: "checkbox",
      icon: <CheckBoxIcon />,
    },
  ];

  const handleSelectedControl = (control) => () => {
    const newQuestions = [
      ...questions,
      { questionDescription: "", answerType: control.key },
    ];

    const selectedSectionItem = sections.find(
      (s) => s.sectionTitle === selectedSection.sectionTitle
    );

    debugger;

    selectedSectionItem["questions"] = newQuestions;
    // selectedSection['questions'] = newQuestions;

    setQuestions(newQuestions);
  };

  const handleQuestionBlur = (index) => (event) => {
    const questionsCopy = utils.copyOf(questions);

    questionsCopy[index].questionDescription = event.target.value;

    setQuestions(questionsCopy);
  };

  const handleSelectedQuestionClick = (question) => () => {
    setSelectedQuestion(question);
  };

  const handleSelectAnswers = (selectedAnswers) => {
    const questionsCopy = questions.map((s) =>
      s.questionDescription === selectedQuestion.questionDescription
        ? {
            ...s,
            answers: selectedAnswers.map((s) => ({
              answerDescription: s.label,
              value: s.value,
            })),
          }
        : { ...s }
    );

    const selectedSectionItem = sections.find(
      (s) => s.sectionTitle === selectedSection.sectionTitle
    );

    selectedSectionItem["questions"] = questionsCopy;

    setQuestions(questionsCopy);
  };

  return (
    <div className={classes.root}>
      <CardControl title="Questions">
        {questions.map((question, index) => (
          <div
            style={{ display: "flex" }}
            onClick={handleSelectedQuestionClick(question)}
          >
            <strong>{`${index + 1}.`}</strong>
            <div className={classes.paper}>
              <TextField
                fullWidth
                id="question-title"
                variant="outlined"
                placeholder="Question"
                onBlur={handleQuestionBlur(index)}
              />

              <div style={{ marginTop: 5 }}>
                {question.answerType === "radioButton" && (
                  <RadioButtonTemplate onSelectAnswers={handleSelectAnswers} />
                )}
                {question.answerType === "textField" && <TextFieldTemplate />}
                {question.answerType === "checkbox" && (
                  <CheckBoxTemplate onSelectAnswers={handleSelectAnswers} />
                )}
              </div>
            </div>
          </div>
        ))}
      </CardControl>

      <div>
        <IconButton aria-label="delete">
          <AddIcon />
        </IconButton>
      </div>

      {selectedSection.sectionTitle && (
        <div
          style={{
            display: "flex",
          }}
        >
          {controls.map((control, index) => (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                marginLeft: index === 0 ? 0 : 5,
              }}
            >
              <ButtonPrimary
                startIcon={control.icon}
                label={control.text}
                onClick={handleSelectedControl(control)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
