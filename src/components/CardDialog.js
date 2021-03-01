import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export const CardDialog = ({ selectedCard, onClose }) => {
  return (
    <Dialog onClose={onClose} open={!!selectedCard}>
      <DialogTitle>{selectedCard?.title ?? "Без имени"}</DialogTitle>
    </Dialog>
  );
};
