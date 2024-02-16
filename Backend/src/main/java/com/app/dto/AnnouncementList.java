package com.app.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class AnnouncementList {
    private String ngoName;
    private String req;
    private String date;
}
