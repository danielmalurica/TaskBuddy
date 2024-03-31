import React, { useState } from "react";
import TableComponent from "../../components/Table/TableComponent";
import Navbar from "../../components/Navigation/Navbar";
import AddTask from "../../components/AddTask/AddTask";
import { Alert, Snackbar } from "@mui/material";

const Homepage = () => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div>
      <Navbar />
      <AddTask openSnackbar={handleOpen} />
      <TableComponent />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Task successfully added!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Homepage;
