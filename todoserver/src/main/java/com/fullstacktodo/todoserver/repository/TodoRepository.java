package com.fullstacktodo.todoserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstacktodo.todoserver.entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Long> {
    
}
