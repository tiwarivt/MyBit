package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class APIResponse {
    private LocalDateTime timeStamp;
    private String message;

    public APIResponse(String message) {
        super();
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}
