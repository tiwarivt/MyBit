package com.app.dto;

import com.app.enities.DonationType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DonationTableResponse {
    private String donorName;
    private DonationType type;
    private int qty;
}
