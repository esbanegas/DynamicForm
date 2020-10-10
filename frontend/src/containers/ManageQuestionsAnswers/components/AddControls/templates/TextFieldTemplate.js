import React, { useState } from "react";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";

export const TextFieldTemplate = () => {
  const [isShortText, setIsShortText] = useState(true);
  const [isLongText, setIsLongText] = useState(false);

  const handleShortTextChange = (event, checked) => {
    setIsShortText(checked);
  };

  const handleLongTextChange = (event, checked) => {
    setIsLongText(checked);
  };

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Respuesta"
        multiline={isLongText || isShortText}
        //   onChange={handleChange("title")}
      />

      <div>
        <FormControlLabel
          control={
            <Checkbox checked={isShortText} onChange={handleShortTextChange} />
          }
          label="Short text"
        />

        <FormControlLabel
          control={
            <Checkbox checked={isLongText} onChange={handleLongTextChange} />
          }
          label="Long text"
        />
      </div>
    </div>
  );
};
