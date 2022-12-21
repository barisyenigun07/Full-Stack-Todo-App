import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

export default function Post() {
    const [text, setText] = useState("");
    return (
        <Box>
            <div>
                <TextField type='text' name='text' label='Text' onChange={(e) => setText(e.target.value)}/>
            </div>
            <Button id='post' variant='contained' onClick={(event) => {
                event.preventDefault();
                const body = {
                    text: text
                };
                axios.post("/todo",body);
            }}>Post</Button>
            <Link id='go_to_main' to="/"><Button variant='contained'>Go Back</Button></Link>
            <Outlet/>    
        </Box>
    )
}
