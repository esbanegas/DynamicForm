import React, { useEffect, useState } from "react";

import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { utils } from "../../../../../utils";
import { ButtonPrimary } from "../../../../../controls/Button";

export const RadioButtonTemplate = ({ isCreateForm, onSelectAnswers }) => {
  const [answers, setAnswers] = useState([]);
  const [value, setValue] = useState("");

  const handleClick = () => {
    const newAnswers = [
      ...answers,
      { label: `Option ${answers.length + 1}`, value: "" },
    ];

    setAnswers(newAnswers);

    onSelectAnswers(newAnswers);
  };

  const handleEditOption = (index) => () => {
    const answersCopy = utils.copyOf(answers);

    answersCopy[index].edit = true;

    onSelectAnswers(answersCopy);
    setAnswers(answersCopy);
  };

  const handleNotEditOption = (index) => (event) => {
    const answersCopy = utils.copyOf(answers);

    answersCopy[index].edit = false;
    answersCopy[index].label = event.target.value;

    onSelectAnswers(answersCopy);
    setAnswers(answersCopy);
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleDeleteOption = (item) => () => {
    const answersCopy = answers.filter((s) => s.label !== item.label);

    setAnswers(answersCopy);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="options"
          name="option-control"
          value={value}
          onChange={handleChange}
        >
          {utils.evaluateArray(answers) &&
            answers.map((item, index) => (
              <div>
                {item.edit ? (
                  <input onBlur={handleNotEditOption(index)} />
                ) : (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={item.label}
                    onClick={handleEditOption(index)}
                  />
                )}

                <IconButton onClick={handleDeleteOption(item)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
        </RadioGroup>
      </FormControl>

      <div>
        <ButtonPrimary isButtonText label="Add Option" onClick={handleClick} />
      </div>
    </div>
  );
};
