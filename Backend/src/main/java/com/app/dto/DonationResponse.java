package com.app.dto;

import com.app.enities.DonationType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class DonationResponse {
    private String donorName;
    private DonationType type;
    private int qty;
}
