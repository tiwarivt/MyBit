package com.app.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SigninResponse {
    private String jwt;
    private String mesg;
}
