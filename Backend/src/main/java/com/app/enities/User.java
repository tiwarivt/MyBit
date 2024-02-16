package com.app.enities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class User {
    @Id
    private String id;
    @NotBlank(message = "First Name Can't be Empty")
    @Field(name = "First_Name")
    private String firstName;
    @NotBlank(message = "Team Name Can't be Empty")
    @Field(name = "Team_Name")
    private String lastName;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email can't be Empty")
    private String email;
    @NotBlank(message = "Password can't be Empty")
    private String password;
    @NotBlank(message = "City can't be Empty")
    private String city;
    @DBRef(lazy = false)
    private UserInfo info;
    @NotNull(message = "Role Can't Be Empty")
    private Role role;
}
