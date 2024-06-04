import { Box, Button, Divider, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTodo, updateTodo } from '../api/todo.api';

const UpdateTodo = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");

    const { id } = useParams();

    const getTodoFromApi = async () => {
        const todoApi = await getTodo(id);
        setText(todoApi?.text);
        setStatus(todoApi?.status);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const body = {
            text: text,
            status: status
        }

        const responseStatus = await updateTodo(id, body);

        if (responseStatus === 200) {
            navigate("/");
        }
    }

    useEffect(() => {
        getTodoFromApi();
    }, [])

  return (
    <Box>
        <Typography variant='h2' sx={{fontWeight: 750}}>Update Todo</Typography>
        <Divider/>
        <form onSubmit={handleUpdate}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", padding: 3}}>
                <TextField type='text' placeholder='Text' value={text} onChange={(e) => setText(e.target.value)}/>
                <Select
                    id='todo-status'
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{marginTop: 1.5}}
                >
                    <MenuItem value={"ON PROGRESS"}>ON PROGRESS</MenuItem>
                    <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                </Select>
                <Button sx={{marginTop: 1.5}} type="submit" variant="contained">Update</Button>
            </Box>
        </form>
    </Box>
  )
}

export default UpdateTodo