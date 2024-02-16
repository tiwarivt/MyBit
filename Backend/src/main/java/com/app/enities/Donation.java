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
public class Donation {
    @Id
    private String id;
    @NotBlank(message = "Donor Name Can't Be Empty")
    private String donorName;
    @NotBlank(message = "Donor Email Can't Be Blank")
    private String donorEmail;
    @NotBlank(message = "Donation Can't Be Empty")
    private DonationType type;
    @NotBlank(message = "Qty can't be Online")
    private int qty;
}
