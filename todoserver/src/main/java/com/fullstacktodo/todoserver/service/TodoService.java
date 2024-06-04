package com.fullstacktodo.todoserver.service;


import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fullstacktodo.todoserver.entity.Todo;
import com.fullstacktodo.todoserver.exception.TodoNotFoundException;
import com.fullstacktodo.todoserver.repository.TodoRepository;
import com.fullstacktodo.todoserver.request.TodoRequest;
import com.fullstacktodo.todoserver.response.TodoResponse;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    public void createTodo(TodoRequest body){
        Todo todo = new Todo();
        todo.setText(body.getText());
        todo.setStatus("ON PROGRESS");
        todoRepository.save(todo);
    }

    public TodoResponse retrieveTodo(Long id){
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (!optionalTodo.isPresent()) {
            throw new TodoNotFoundException();
        }
        return TodoResponse.fromEntity(optionalTodo.get());
    }

    public void updateTodo(Long id, TodoRequest body){
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (!optionalTodo.isPresent()) {
            throw new TodoNotFoundException();
        }
        Todo todo = optionalTodo.get();
        todo.setText(body.getText());
        todo.setStatus(body.getStatus());
        todoRepository.save(todo);
    }

    public void deleteTodo(Long id){
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (!optionalTodo.isPresent()) {
            throw new TodoNotFoundException();
        }
        todoRepository.deleteById(id);
    }

    public List<TodoResponse> retrieveTodos(){
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map(todo -> TodoResponse.fromEntity(todo)).collect(Collectors.toList());
    }
}
