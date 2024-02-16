package com.app.dto;

import com.app.enities.DonationType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class DonationRequest {
    private String donorName;
    private String donorEmail;
    private DonationType type;
    private int qty;
}
