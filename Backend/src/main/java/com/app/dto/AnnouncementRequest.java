package com.app.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class AnnouncementRequest {
    private String ngoName;
    private String req;
    private String date;
}
