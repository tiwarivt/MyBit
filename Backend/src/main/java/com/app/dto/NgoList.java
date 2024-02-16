package com.app.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class NgoList {
    private String firstName;
    private String lastName;
    private String city;
}
