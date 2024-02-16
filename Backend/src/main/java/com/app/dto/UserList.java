package com.app.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserList {
    private String firstName;
    private String lastName;
    private String city;
    private String role;
}
