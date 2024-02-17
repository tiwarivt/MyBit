package com.app.service;

import com.app.dto.DonationTableResponse;

import java.util.List;

public interface DonationTableService {

    List<DonationTableResponse> getAllDonationDoneByDonor(String email);

}
