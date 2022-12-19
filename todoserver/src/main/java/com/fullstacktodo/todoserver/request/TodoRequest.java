package com.fullstacktodo.todoserver.request;

import java.time.LocalDate;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TodoRequest {
    private String text;
    private String status = "ON PROGRESS";
}
