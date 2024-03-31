import React, { useEffect, useState } from "react";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import {
  useDeletePostMutation,
  useGetTasksByUserQuery,
  useUpdatePostMutation,
} from "../../features/tasks/tasksApiSlice";
import { useSelector } from "react-redux";
import { Auth, Task } from "../../features/types/Types";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddTaskModal from "../AddTask/AddTaskModal";
import ModifyTaskModal from "../AddTask/ModifyTaskModal";

const TableComponent = () => {
  const user = useSelector((state: Auth) => state.auth.userInfo);
  const { _id } = user;
  const { currentData, isSuccess } = useGetTasksByUserQuery(_id);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>({
    title: "",
    description: "",
    addedBy: _id,
    priority: "",
    progress: 0,
    status: "",
  });
  const [taskId, setTaskId] = useState<string>();

  const handleModify = async (row: Task) => {
    try {
      await updatePost(row).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedTask.progress === 100) {
      setSelectedTask({ ...selectedTask, status: "Completed" });
    } else if (selectedTask.progress < 100) {
      setSelectedTask({ ...selectedTask, status: "In Progress" });
    }
  }, [selectedTask.progress]);

  const handleOpenModifyModal = (task: Task) => {
    setSelectedTask(task);
    setOpenModifyModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = async (row: Task) => {
    try {
      await deletePost(row._id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "crtNo", headerName: "Crt No", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "priority",
      headerName: "Priority",
      width: 100,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 150,
      type: "number",
    },
    { field: "status", headerName: "Status", width: 200 },
    { field: "timestamp", headerName: "Date Added", width: 200 },
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "deleteButton",
      headerName: "Actions",
      width: 120,
      renderCell: (params: { row: Task }) => (
        <div>
          <IconButton
            /* onClick={() => handleModify(params.row)} */
            onClick={() => handleOpenModifyModal(params.row)}
            aria-label="modify"
            size="small"
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row)}
            aria-label="delete"
            size="small"
          >
            <GridDeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = isSuccess
    ? currentData.data.map((task: Task, index: number) => ({
        crtNo: index + 1,
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        progress: task.progress,
        status: task.status,
        timestamp: task.timestamp,
      }))
    : [];

  return (
    <div>
      <div style={{ height: "60vh", width: "80%", margin: "50px auto" }}>
        <h4 style={{ margin: "10px" }}>Your tasks</h4>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.crtNo}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
          rowSelection={false}
        />
      </div>
      <AddTaskModal
        open={openModal}
        handleClose={handleClose}
        taskId={taskId}
      />
      <ModifyTaskModal
        openModifyModal={openModifyModal}
        handleClose={() => setOpenModifyModal(false)}
        taskData={selectedTask}
        handleModify={handleModify}
      />
    </div>
  );
};

export default TableComponent;
