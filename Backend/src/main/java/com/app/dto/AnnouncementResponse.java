package com.app.dto;

import lombok.*;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString(callSuper = true)
public class AnnouncementResponse {
    private String message;
}
