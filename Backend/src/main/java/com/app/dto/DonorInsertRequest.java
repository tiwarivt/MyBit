package com.app.dto;

import com.app.enities.Role;
import com.app.enities.UserInfo;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class DonorInsertRequest {
    @NotBlank(message = "First Name Can't be Empty")
    private String firstName;
    @NotBlank(message = "Team Name Can't be Empty")
    private String lastName;
    @NotBlank(message = "Email can't be Empty")
    private String email;
    @NotBlank(message = "Password can't be Empty")
    private String password;
    @NotBlank(message = "City can't be Empty")
    private String city;
    private UserInfo info;
    @NotNull(message = "Role Can't Be Empty")
    private Role role;
}
