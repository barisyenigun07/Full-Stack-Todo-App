import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Divider } from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getTodos } from '../api/todo.api';

function Todos() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    const getTodosFromApi = async () => {
        const todosApi = await getTodos();
        setTodos(todosApi);
    }
    useEffect(() => {
        getTodosFromApi();
    },[])
    
    return (
        <>
            <Typography variant='h2' sx={{fontWeight: 750}}>Todo List</Typography>
            <Divider sx={{fontWeight: 750}}/>
            <TableContainer sx={{marginTop: "1.5rem", boxShadow: 7}} component={Paper}>
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
                                    <Link to={`/todo/${todo.id}`}>{todo.id}</Link>
                                </TableCell>
                                <TableCell align="center">{todo.text}</TableCell>
                                <TableCell align="center">{todo.status}</TableCell>
                                <TableCell align='right'><Button variant='contained' onClick={(e) => {
                                    navigate(`/update/todo/${todo.id}`)
                                }}>Update</Button></TableCell>
                                <TableCell align='right'><Button variant='contained' color='error' onClick={(e) => {
                                    axios.delete(`/todo/${todo.id}`);
                                    window.location.reload();
                                }}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link id='add_todo' to="/post"><Button variant='contained'>Add Todo</Button></Link>
            <Outlet/>
        </>
    )
}

export default Todos;
