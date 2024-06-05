import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Divider, Modal, Box } from '@mui/material';
import React, {useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { deleteTodo, getTodos } from '../api/todo.api';

function Todos() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const getTodosFromApi = async () => {
        const todosApi = await getTodos();
        setTodos(todosApi);
    }

    const handleOpen = (id) => {
        setSelectedTodoId(id);
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedTodoId(null);
    }

    const handleDeleteTodo = async () => {
        if (selectedTodoId !== null) {
            await deleteTodo(selectedTodoId);
            handleClose();
            window.location.reload();
        }
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
                                    handleOpen(todo?.id)
                                }}>Delete</Button></TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link style={{position: "absolute", marginTop: "10px", textDecoration: "none"}} to="/post"><Button variant='contained'>Add Todo</Button></Link>
            <Outlet/>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: 400, 
                        bgcolor: 'background.paper', 
                        border: '2px solid #000', 
                        boxShadow: 24, p: 4
                }}>
                    <Typography sx={{textAlign: "center"}} variant="h6" component="h2">
                        Are you sure to delete this todo?
                    </Typography>
                    <Box sx={{mt: 2, display: "flex", justifyContent: "center", gap: 4}}>
                        <Button variant="contained" color="error" onClick={handleDeleteTodo}>
                            Yes
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            No
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default Todos;
