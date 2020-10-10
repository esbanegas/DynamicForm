import React, { useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";

import { utils } from "../../../../../utils";
import { Checkbox, FormControlLabel, IconButton } from "@material-ui/core";

export const CheckBoxTemplate = () => {
  const [answers, setAnswers] = useState([]);
  const [value, setValue] = useState("");

  const handleClick = () => {
    setAnswers([
      ...answers,
      { label: `Option ${answers.length + 1}`, value: "" },
    ]);
  };

  const handleEditOption = (index) => () => {
    const answersCopy = utils.copyOf(answers);

    answersCopy[index].edit = true;

    setAnswers(answersCopy);
  };

  const handleNotEditOption = (index) => (event) => {
    const answersCopy = utils.copyOf(answers);

    answersCopy[index].edit = false;
    answersCopy[index].label = event.target.value;

    setAnswers(answersCopy);
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      {utils.evaluateArray(answers) &&
        answers.map((item, index) => (
          <div>
            {item.edit ? (
              <input onBlur={handleNotEditOption(index)} />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    checked
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label={item.label}
                onClick={handleEditOption(index)}
              />
            )}

            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}

      <div onClick={handleClick}>Add Option</div>
    </div>
  );
};
