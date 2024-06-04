import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTodo } from '../api/todo.api';

const Todo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [todo, setTodo] = useState({});

  const getTodoFromApi = async () => {
    const todoApi = await getTodo(id);
    setTodo(todoApi);
  }

  useEffect(() => {
    getTodoFromApi();
  }, [])

  return (
    <Box>
        <Typography variant="h2" sx={{fontWeight: 750}}>Todo Detail</Typography>
        <Divider/>
        <Box sx={{marginTop: 3.5}}>
          <Typography>ID: {todo?.id}</Typography>
          <Typography>Text: {todo?.text}</Typography>
          <Typography>Status: {todo?.status}</Typography>
        </Box>
        <Box sx={{marginTop: 3.5, display: "flex", justifyContent: "center", gap: 3}}>
          <Button variant="contained" onClick={(e) => navigate(`/update/todo/${id}`)}>Update</Button>
          <Button variant="contained" color="error">Delete</Button>
        </Box>
    </Box>
  )
}

export default Todo