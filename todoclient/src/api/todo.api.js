import axios from "axios";

export const createTodo = async (data) => {
    return await axios.post("/todo", data)
                .then(res => res.status)
                .catch((err) => {throw err});
}

export const getTodo = async (id) => {
    return await axios.get(`/todo/${id}`)
                      .then(res => res.data)
                      .catch(err => {throw err});
}

export const getTodos = async () => {
    return await axios.get("/todo")
                      .then(res => res.data)
                      .catch(err => {throw err}); 
}

export const updateTodo = async (id, data) => {
    return await axios.put(`/todo/${id}`, data)
                .then(res => res.status)
                .catch(err => {throw err});
}

export const deleteTodo = async (id) => {
    return await axios.delete(`/todo/${id}`)
                .then(res => res.status)
                .catch(err => {throw err});
}

