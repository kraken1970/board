import React from "react";

// components
import { Board } from "../../src";

// utils
import { nestData } from "../../src/utils";
import { useBoardContext } from "../../src/store";

export const BoardDemo = () => {
  const [
    { selectedCard, ...board },
    { createCard, moveCard, toggleCard },
  ] = useBoardContext();

  const fullCollumns = nestData(board);

  return (
    <Board
      columns={fullCollumns}
      toggleCard={toggleCard}
      selectedCard={selectedCard}
      createCard={createCard}
      toggleCard={toggleCard}
      moveCard={moveCard}
    />
  );
};
