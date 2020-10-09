import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, List, ListItem, makeStyles } from "@material-ui/core";
import { utils } from "../../utils";

const useListStyles = makeStyles((theme) => ({
  list: {
    activeItem: {
      backgroundColor: "red",
    },
  },

  item: {
    display: "flex",
    flexDirection: "column",
    width: 200,

    "> strong": {
      color: theme.palette.secondary.main,
    },
  },
}));

export const ListControl = ({
  items,
  onSelectedItem,
  onRenderItem,
  fieldName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const classes = useListStyles();

  const handleSelectedItem = (item, key) => (event) => {
    if (onSelectedItem) {
      setSelectedIndex(key);
      onSelectedItem(item);
    }
  };

  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 120px",
    padding: 1,
    overflow: "auto",
  };

  return (
    <Box justifyContent="left" bgcolor="#F8F8F8" borderRadius="8">
      <List component="nav" style={flexContainer} classes={classes.list}>
        {utils.evaluateArray(items) &&
          items.map((item, key) => (
            <ListItem
              button
              key={`CONS${key}`}
              onClick={handleSelectedItem(item, key)}
              selected={selectedIndex === key}
            >
              <div className={classes.item}>
                {onRenderItem ? onRenderItem(item) : item[fieldName]}
              </div>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

ListControl.propTypes = {
  items: PropTypes.array,
};
