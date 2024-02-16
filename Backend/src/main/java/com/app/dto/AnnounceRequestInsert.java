package com.app.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class AnnounceRequestInsert {
    @NotBlank
    private String ngoName;
    @NotBlank(message = "Requirement needed")
    private String req;
    @NotBlank(message = "Date Cannot be blank")
    private String date;
}
