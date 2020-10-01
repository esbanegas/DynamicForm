import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export const CheckboxControl = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          color="primary"
        />
      }
      label={label}
    />
  );
};
