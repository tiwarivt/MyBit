package com.app.service;

import com.app.dto.DonationRequest;
import com.app.dto.DonationResponse;

import java.util.List;

public interface DonationService {
    List<DonationResponse> getDonationList();

    DonationResponse makeADonation(DonationRequest newDonation);
}
