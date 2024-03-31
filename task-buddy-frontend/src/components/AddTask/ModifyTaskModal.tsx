import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { Task } from "../../features/types/Types";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 3,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  gap: 4,
};

type OpenFunction = () => void;

type Props = {
  openModifyModal: boolean;
  taskData: Task;
  handleClose: () => void;
  handleModify: (task: Task) => void;
  openSnackbar?: OpenFunction;
  taskId?: string;
};

const ModifyTaskModal = (props: Props) => {
  const { openModifyModal, handleClose, taskData, handleModify } = props;
  const [modifiedTask, setModifiedTask] = useState({ ...taskData });

  useEffect(() => {
    setModifiedTask({ ...taskData });
  }, [taskData]);

  const handleChangePriority = (event: SelectChangeEvent) => {
    setModifiedTask({
      ...modifiedTask,
      priority: event.target.value as string,
    });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setModifiedTask({ ...modifiedTask, progress: newValue as number });
  };

  const handleSave = () => {
    handleModify(modifiedTask);
    handleClose();
  };

  return (
    <Modal
      open={openModifyModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Modify Task
        </Typography>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ width: "80%" }}
          value={modifiedTask.title}
          onChange={(e) =>
            setModifiedTask({ ...modifiedTask, title: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          sx={{ width: "80%" }}
          multiline={true}
          value={modifiedTask.description}
          onChange={(e) =>
            setModifiedTask({ ...modifiedTask, description: e.target.value })
          }
        />
        <FormControl sx={{ width: "80%" }}>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modifiedTask.priority}
            label="Priority"
            sx={{ width: "80%" }}
            onChange={handleChangePriority}
          >
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ width: "80%", display: "flex" }}>
          <Typography id="input-slider">Progress</Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item></Grid>
            <Grid item xs>
              <Slider
                value={modifiedTask.progress}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                sx={{ width: "90%", marginLeft: 1 }}
              />
            </Grid>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              {modifiedTask.progress} %
            </Typography>
          </Grid>
        </Box>
        <Button variant="outlined" onClick={handleSave}>
          Update data
        </Button>
      </Box>
    </Modal>
  );
};

export default ModifyTaskModal;
