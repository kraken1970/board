import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8
);

export const cardFactory = ({ columnId, title }) => ({
  id: nanoid(),
  title: title ?? "Без имени",
  columnId,
  createdAt: new Date(),
});

export const normalizeData = (board) =>
  board.reduce(
    (acc, column) => {
      acc.board.columns.push(column.id);
      acc.columns[column.id] = {
        ...column,
        cards: column.cards.map(({ id }) => id),
      };

      column.cards.forEach((card) => {
        acc.cards[card.id] = card;
      });

      return acc;
    },
    {
      board: {
        columns: [],
      },
      columns: {},
      cards: {},
    }
  );

export const nestData = ({ board, columns, cards }) =>
  board.columns.map((columnId) => {
    const currentColumn = columns[columnId];
    const columnWithCards = currentColumn.cards.map((cardId) => cards[cardId]);

    return { ...currentColumn, cards: columnWithCards };
  });
