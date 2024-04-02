import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddPostMutation } from "../../features/tasks/tasksApiSlice";
import { Auth, Task } from "../../features/types/Types";

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
  openModal: boolean;
  handleClose: () => void;
  openSnackbar?: OpenFunction;
};

const AddTaskModal = (props: Props) => {
  const { openModal, handleClose, openSnackbar } = props;
  const user = useSelector((state: Auth) => state.auth.userInfo);
  const { _id } = user;

  console.log(openModal);

  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    addedBy: _id,
    priority: "",
    progress: 0,
    status: "",
  });

  const [addPost] = useAddPostMutation();

  const handleChangePriority = (event: SelectChangeEvent) => {
    setNewTask({ ...newTask, priority: event.target.value as string });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNewTask({ ...newTask, progress: newValue as number });
  };

  useEffect(() => {
    if (newTask.progress === 100) {
      setNewTask({ ...newTask, status: "Completed" });
    } else {
      setNewTask({ ...newTask, status: "In Progress" });
    }
  }, [newTask.progress]);

  const handleSave = async () => {
    try {
      const res = await addPost(newTask).unwrap();
      if (res.success) {
        setNewTask({
          title: "",
          description: "",
          addedBy: _id,
          priority: "",
          progress: 0,
          status: "",
        });
        handleClose();
        openSnackbar && openSnackbar();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={openModal}
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
          Add a new task
        </Typography>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{ width: "80%" }}
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          sx={{ width: "80%" }}
          multiline={true}
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <FormControl sx={{ width: "80%" }}>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newTask.priority}
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
                value={
                  typeof newTask.progress === "number" ? newTask.progress : 0
                }
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
              {newTask.progress} %
            </Typography>
          </Grid>
        </Box>
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
