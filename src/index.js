import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import Box from "@material-ui/core/Box"

import { Column } from "./components/Column"
import { CardDialog } from "./components/CardDialog"

export const Board = ({
  columns = [],
  createCard,
  toggleCard,
  moveCard,
  selectedCard,
}) => {
  const onClose = () => toggleCard(null)

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="flex" p={1}>
        <CardDialog onClose={onClose} selectedCard={selectedCard} />
        {columns.map((column) => (
          <Column
            {...column}
            toggleCard={toggleCard}
            createCard={createCard}
            moveCard={moveCard}
            key={column.id}
          />
        ))}
      </Box>
    </DndProvider>
  )
}
