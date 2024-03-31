import React, { SyntheticEvent, useState } from "react";
import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

type Props = {
  open: boolean;
  snackbarMessage: string;
  handleClose: (
    event?: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => void;
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
};

const SnackbarComponent = (props: Props) => {
  const { open, snackbarMessage, handleClose, severity } = props;

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
