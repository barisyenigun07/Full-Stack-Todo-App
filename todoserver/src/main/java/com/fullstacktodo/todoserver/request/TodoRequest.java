package com.fullstacktodo.todoserver.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TodoRequest {
    private String text;
    private String status;
}
