package com.fullstacktodo.todoserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstacktodo.todoserver.request.TodoRequest;
import com.fullstacktodo.todoserver.response.TodoResponse;
import com.fullstacktodo.todoserver.service.TodoService;

@RestController
@RequestMapping("/todo")
public class TodoController {
    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @PostMapping
    public void createTodo(@RequestBody TodoRequest body){
        todoService.createTodo(body);
    }

    @GetMapping("/{id}")
    public TodoResponse retrieveTodo(@PathVariable Long id){
        return todoService.retrieveTodo(id);
    }

    @PutMapping("/{id}")
    public void updateTodo(@PathVariable Long id, @RequestBody TodoRequest body){
        todoService.updateTodo(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

    @GetMapping
    public List<TodoResponse> retrieveTodos(){
        return todoService.retrieveTodos();
    }
}
