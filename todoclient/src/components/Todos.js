import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { Outlet, Link } from "react-router-dom";

function Todos() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get("/todo")
        .then((res) => {
            setTodos(res.data)    
        })
        .catch(err => console.log(err))
    },[todos])
    
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align='center'>Text</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='right'></TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((todo) => (
                            <TableRow key={todo.id} 
                                      sx={{'&:last-child td, &:last-child th': {border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {todo.id}
                                </TableCell>
                                <TableCell align="center">{todo.text}</TableCell>
                                <TableCell align="center">{todo.status}</TableCell>
                                <TableCell align='right'><Button variant='contained' onClick={(e) => {
                                    axios.put(`/todo/${todo.id}`)
                                }}>Update</Button></TableCell>
                                <TableCell align='right'><Button variant='contained' color='error' onClick={(e) => {
                                    axios.delete(`/todo/${todo.id}`);
                                }}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link id='add_todo' to="/post"><Button variant='contained'>Add Todo</Button></Link>
            <Outlet/>
        </div>
    )
}

export default Todos;
