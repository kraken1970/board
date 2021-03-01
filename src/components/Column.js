import React, { useState } from "react";

// components
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { ColumnHeader } from "./ColumnHeader";
import { ColumnBody } from "./ColumnBody";

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    width: 200,
    marginLeft: spacing(1),
    marginRight: spacing(1),
  },
}));

export const Column = ({
  id,
  title,
  color,
  canCreate,
  cards,
  createCard,
  toggleCard,
  moveCard,
}) => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  const onCreateClick = () => setShowInput(true);

  const onBlur = () => {
    createCard({ columnId: id, title: value });
    setValue("");
    setShowInput(false);
  };

  const onChange = (e) => setValue(e.target.value);

  return (
    <Box className={classes.wrapper}>
      <ColumnHeader
        onClick={onCreateClick}
        title={title}
        color={color}
        canCreate={canCreate}
      />
      <ColumnBody
        moveCard={moveCard}
        columnId={id}
        cards={cards}
        toggleCard={toggleCard}
        showInput={showInput}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
