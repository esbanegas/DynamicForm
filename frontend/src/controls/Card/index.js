import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

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
    </Card>
  );
};

CardControl.propTypes = {
  title: PropTypes.string.isRequired,
  child: PropTypes.element.isRequired,
};

export default CardControl;
