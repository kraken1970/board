import React, { useReducer, useContext, useMemo } from "react";

// utils
import { cardFactory } from "./utils";
import { actionTypes } from "./constants";

const { CREATE_CARD, TOGGLE_CARD, MOVE_CARD } = actionTypes;

const boardReducer = (state, action) => {
  switch (action.type) {
    case CREATE_CARD:
      const { columnId, title } = action.payload;
      const newCard = cardFactory({ columnId, title });

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cards: [...state.columns[columnId].cards, newCard.id],
          },
        },
        cards: { ...state.cards, [newCard.id]: newCard },
      };
    case TOGGLE_CARD:
      return {
        ...state,
        selectedCard: action.payload,
      };
    case MOVE_CARD: {
      const { from, to, cardId } = action.payload;
      const {
        board: { columns },
      } = state;
      const fromIdx = columns.indexOf(from);
      const toIdx = columns.indexOf(to);
      const idxSum = fromIdx - toIdx;

      if (idxSum !== -1 && idxSum !== 1) {
        return state;
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [to]: {
            ...state.columns[to],
            cards: [...state.columns[to].cards, cardId],
          },
          [from]: {
            ...state.columns[from],
            cards: state.columns[from].cards.filter((id) => id !== cardId),
          },
        },
        cards: {
          ...state.cards,
          [cardId]: { ...state.cards[cardId], columnId: to },
        },
      };
    }

    default:
      return state;
  }
};

const BoardContext = React.createContext();

export const BoardProvider = ({ children, columns }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    ...columns,
    selectedCard: null,
  });

  const createCard = ({ columnId, title }) =>
    dispatch({
      type: CREATE_CARD,
      payload: { columnId, title },
    });

  const moveCard = ({ cardId, from, to }) =>
    dispatch({
      type: MOVE_CARD,
      payload: {
        cardId,
        from,
        to,
      },
    });

  const toggleCard = (cardId) =>
    dispatch({
      type: TOGGLE_CARD,
      payload: cardId,
    });

  const actions = useMemo(
    () => ({
      createCard,
      moveCard,
      toggleCard,
    }),
    []
  );

  const store = useMemo(() => [state, actions], [state]);

  return (
    <BoardContext.Provider value={store}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (context === undefined) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }

  return context;
};
