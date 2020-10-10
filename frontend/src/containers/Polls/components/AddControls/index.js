import React, { useState } from "react";

import { IconButton, Radio, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CardControl from "../../../../controls/Card";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ButtonPrimary } from "../../../../controls/Button";
import { RadioButtonTemplate } from "./templates/RadioButtonTemplate";
import { TextFieldTemplate } from "./templates/TextFieldTemplate";
import { CheckBoxTemplate } from "./templates/CheckBoxTemplate";

export const AddControl = ({ selectedSection, setSelectedSection }) => {
  const [questions, setQuestions] = useState([]);

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
    setQuestions([
      ...questions,
      { questionDescription: "", answerType: control.key },
    ]);
  };

  return (
    <div>
      <CardControl title="Questions">
        {questions.map((question) => (
          <div>
            <TextField
              fullWidth
              id="question-title"
              variant="outlined"
              placeholder="Pregunta"
              //   onChange={handleChange("title")}
            />

            {question.answerType === "radioButton" && <RadioButtonTemplate />}
            {question.answerType === "textField" && <TextFieldTemplate />}
            {question.answerType === "checkbox" && <CheckBoxTemplate />}
          </div>
        ))}
      </CardControl>

      <IconButton aria-label="delete">
        <AddIcon />
      </IconButton>

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
    </div>
  );
};
