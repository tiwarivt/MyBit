package com.app.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SigninRequest {

    private String email;
    private String password;
}
