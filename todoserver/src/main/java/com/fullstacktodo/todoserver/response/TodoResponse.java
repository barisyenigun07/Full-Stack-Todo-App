package com.fullstacktodo.todoserver.response;

import com.fullstacktodo.todoserver.entity.Todo;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Builder
public class TodoResponse {
    private Long id;
    private String text;
    private String status;

    public static TodoResponse fromEntity(Todo todo){
        return TodoResponse.builder()
                            .id(todo.getId())
                            .text(todo.getText())
                            .status(todo.getStatus())
                            .build();
    }
}
