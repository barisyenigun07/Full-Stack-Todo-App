import { Box, Button, Divider, Typography, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getTodo } from "../api/todo.api";

const Todo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [todo, setTodo] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTodoFromApi = async () => {
    const todoApi = await getTodo(id);
    setTodo(todoApi);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleDeleteTodo = async (e) => {
    const responseStatus = await deleteTodo(id);
    if (responseStatus === 200) {
      handleClose();
      navigate("/");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getTodoFromApi();
  }, []);

  return (
    <Box>
      <Typography variant="h2" sx={{ fontWeight: 750 }}>
        Todo Detail
      </Typography>
      <Divider />
      <Box sx={{ marginTop: 3.5 }}>
        <Typography>ID: {todo?.id}</Typography>
        <Typography>Text: {todo?.text}</Typography>
        <Typography>Status: {todo?.status}</Typography>
      </Box>
      <Box
        sx={{
          marginTop: 3.5,
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={(e) => navigate(`/update/todo/${id}`)}
        >
          Update
        </Button>
        <Button variant="contained" color="error" onClick={handleOpen}>
          Delete
        </Button>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
            Are you sure to delete this todo?
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 4 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTodo}
            >
              Yes
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Todo;
