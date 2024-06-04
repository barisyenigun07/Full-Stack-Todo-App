import React, { useState } from 'react'
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { createTodo } from '../api/todo.api';

export default function AddTodo() {
    const navigate = useNavigate();
    const [text, setText] = useState("");

    const handleAddTodo = async (e) => {
        e.preventDefault();
        const body = {
            text: text
        }

        const responseStatus = await createTodo(body);

        if (responseStatus === 200) {
            navigate("/");
        }
    }
    return (
        <Box>
            <Typography variant='h2' sx={{fontWeight: 750}}>Add Todo</Typography>
            <Divider/>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "2.5rem"}}>
                <TextField type='text' name='text' label='Text' onChange={(e) => setText(e.target.value)}/>
                <Box sx={{display: "flex", gap: 4, marginTop: "1.5rem"}}>
                    <Button disabled={text.length === 0} style={{textDecoration: "none"}} variant='contained' onClick={handleAddTodo}>Post</Button>
                    <Link style={{textDecoration: "none"}} to="/"><Button variant='contained' color="error">Go Back</Button></Link>
                    <Outlet/> 
                </Box>
            </Box>
        </Box>
    )
}
