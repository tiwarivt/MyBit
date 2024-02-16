package com.app.enities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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
    @DBRef
    private String userId;
    private List<String> donationId;

    public DonationTable(String userId, List<String> donationId) {
        this.userId = userId;
        this.donationId = donationId;
    }
}
