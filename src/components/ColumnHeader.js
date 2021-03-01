import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    background: "#D3D3D3",
    borderRadius: 5,
    height: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginRight: spacing(1),
    backgroundColor: ({ color }) => (color ? color : null),
  },
}));

export const ColumnHeader = ({ title, color, canCreate, onClick }) => {
  const classes = useStyles({ color });

  return (
    <Box
      px={0.5}
      mb={2}
      className={classes.wrapper}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box ml={1} display="flex" alignItems="center">
        {color ? <Box className={classes.dot} /> : null}
        {title}
      </Box>
      {canCreate ? <Button onClick={onClick}>+</Button> : null}
    </Box>
  );
};
