import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

// components
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// constants
import { itemTypes } from "../constants";

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    background: "#C0C0C0",
  },
  paper: {
    padding: spacing(1),
  },
  avatar: {
    width: spacing(4),
    height: spacing(4),
  },
}));

export const Card = ({ toggleCard, idx, moveCard, ...card }) => {
  const { title } = card;
  const ref = useRef(null);
  const classes = useStyles();
  const onClick = () => toggleCard(card);

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop(item) {
      moveCard({
        from: item.columnId,
        to: card.columnId,
        cardId: item.id,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.CARD, ...card, idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Box ref={ref} mb={1} className={classes.wrapper} onClick={onClick}>
      <Paper
        style={{
          opacity: isDragging ? 0.5 : 1,
          color: isOver ? "red" : "black",
        }}
        className={classes.paper}
      >
        <Box>{title}</Box>
        <Box display="flex" justifyContent="flex-end">
          <Avatar className={classes.avatar} />
        </Box>
      </Paper>
    </Box>
  );
};
