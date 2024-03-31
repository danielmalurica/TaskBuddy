import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";

type OpenFunction = () => void;

type Props = { openSnackbar: OpenFunction };

const AddTask = ({ openSnackbar }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddIcon />
        Add a new task
      </Button>
      <AddTaskModal
        openModal={openModal}
        handleClose={handleClose}
        openSnackbar={openSnackbar}
      />
    </div>
  );
};

export default AddTask;
