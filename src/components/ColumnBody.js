import React from "react";
import { useDrop } from "react-dnd";

// components
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "./Card";

// constants
import { itemTypes } from "../constants";

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    background: "#D3D3D3",
    padding: spacing(1),
    borderRadius: 5,
    minHeight: 100,
  },
}));

export const ColumnBody = ({
  columnId,
  cards,
  toggleCard,
  moveCard,
  showInput,
  onBlur,
  onChange,
  value,
}) => {
  const classes = useStyles();
  const [, drop] = useDrop(() => ({
    accept: itemTypes.CARD,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop(item, monitor) {
      if (monitor.isOver()) {
        moveCard({
          from: item.columnId,
          to: columnId,
          cardId: item.id,
        });
      }
    },
  }));

  return (
    <Box
      ref={drop}
      className={classes.wrapper}
      display="flex"
      flexDirection="column"
    >
      <Box height="100%">
        {cards.map((card, idx) => (
          <Card
            {...card}
            key={card.id}
            toggleCard={toggleCard}
            moveCard={moveCard}
            idx={idx}
          />
        ))}
        {showInput ? (
          <Box>
            <Paper>
              <TextField
                onChange={onChange}
                value={value}
                autoFocus
                onBlur={onBlur}
              />
            </Paper>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
