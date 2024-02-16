package com.app.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NgoResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String city;
}
