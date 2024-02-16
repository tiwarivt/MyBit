package com.app.enities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class AnnounceRequest {
    @Id
    private String id;
    @NotBlank(message = "Your NGO name can't be empty")
    private String ngoName;
    @NotBlank(message = "Requirement needed")
    private String req;
    @NotBlank(message = "Date Cannot be blank")
    private String date;
}
