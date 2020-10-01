import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

export const ButtonDefault = ({ label, onClick, disabled, isButtonText }) => {
  const props = isButtonText ? {} : { variant: "contained" };
  return (
    <Button {...props} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export const ButtonPrimary = ({
  label,
  onClick,
  disabled,
  isButtonText,
  component,
  startIcon,
  endIcon,
}) => {
  const props = isButtonText ? {} : { variant: "contained" };

  return (
    <Button
      {...props}
      color="primary"
      onClick={onClick}
      disabled={disabled}
      component={component}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
};

export const ButtonSecundary = ({
  label,
  onClick,
  disabled,
  isButtonText,
  component,
  startIcon,
  endIcon,
}) => {
  const props = isButtonText ? {} : { variant: "contained" };

  return (
    <Button
      {...props}
      color="secondary"
      onClick={onClick}
      disabled={disabled}
      component={component}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {label}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export const ButtonUploadImage = ({ isIconButton, label, onClick }) => {
  const classes = useStyles();

  const onChangeImage = (event, file) => {
    debugger;
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="upload-img"
        multiple
        type="file"
        onChange={onChangeImage}
      />

      {isIconButton && (
        <label htmlFor="upload-img">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            // onClick={onClick}
          >
            <PhotoCamera />
          </IconButton>
        </label>
      )}

      {!isIconButton && (
        <label htmlFor="upload-img">
          <ButtonPrimary label="upload" component="span" />
        </label>
      )}
    </div>
  );
};
