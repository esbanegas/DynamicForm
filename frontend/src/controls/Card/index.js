import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardActions,
} from "@material-ui/core";
import { ButtonPrimary } from "../Button";
import { utils } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
  cardRoot: {
    position: "relative",
  },
  cardHeader: {
    color: theme.palette.primary.main,
  },
  cardComponent: {
    position: "absolute",
    left: 20,
    top: 36,
    background: "#fff",
  },
}));

const CardControl = ({ title, children, actions }) => {
  const classes = useStyles();

  const renderActions = (actions) => {
    if (utils.evaluateArray(actions)) {
      return actions.map((action) => {
        return (
          <ButtonPrimary
            startIcon={action.startIcon}
            label={action.label}
            onClick={action.onClick}
          />
        );
      });
    }
    return <div></div>;
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          root: classes.cardRoot,
          title: classes.cardHeader,
        }}
        title={title}
      />
      <Divider />
      <CardContent>{children}</CardContent>
      <Divider />
      <CardActions>{renderActions(actions)}</CardActions>
    </Card>
  );
};

CardControl.propTypes = {
  title: PropTypes.string.isRequired,
  child: PropTypes.element.isRequired,
  actions: PropTypes.array,
};

export default CardControl;
