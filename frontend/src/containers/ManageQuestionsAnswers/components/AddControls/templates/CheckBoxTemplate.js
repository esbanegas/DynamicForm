import React, { useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";

import { utils } from "../../../../../utils";
import { Checkbox, FormControlLabel, IconButton } from "@material-ui/core";
import { ButtonPrimary } from "../../../../../controls/Button";

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

  const handleDeleteOption = (item) => () => {
    const answersCopy = answers.filter((s) => s.label !== item.label);

    setAnswers(answersCopy);
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
                    checked={false}
                    // onChange={handleChange}
                    name="checkedA"
                  />
                }
                label={item.label}
                onClick={handleEditOption(index)}
              />
            )}

            <IconButton onClick={handleDeleteOption(item)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}

      <div>
        <ButtonPrimary isButtonText label="Add Option" onClick={handleClick} />
      </div>
    </div>
  );
};
