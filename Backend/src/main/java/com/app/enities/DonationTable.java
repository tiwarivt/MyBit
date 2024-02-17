package com.app.enities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class DonationTable {
    @Id
    private String id;
    private String userId;
    private List<String> donationId;

    public DonationTable(String userId, List<String> donationId) {
        this.userId = userId;
        if (donationId != null) {
            this.donationId = new ArrayList<>(donationId); // Use existing list if not null
        } else {
            this.donationId = new ArrayList<>(); // Initialize with an empty list if null
        }
    }
}
