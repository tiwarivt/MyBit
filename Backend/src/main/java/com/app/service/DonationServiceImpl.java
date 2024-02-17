package com.app.service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.DonationRequest;
import com.app.dto.DonationResponse;
import com.app.enities.Donation;
import com.app.enities.DonationTable;
import com.app.enities.User;
import com.app.repository.DonationRepository;
import com.app.repository.DonationTableRepository;
import com.app.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DonationServiceImpl implements DonationService {

    @Autowired
    DonationRepository donationRepo;

    @Autowired
    DonationTableRepository donationTableRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public List<DonationResponse> getDonationList() {
        List<Donation> donationList = donationRepo.findAll();
        List<DonationResponse> donationResp = donationList.stream()
                .map(donation -> mapper.map(donation, DonationResponse.class))
                .collect(Collectors.toList());
        return donationResp;
    }

    @Override
    public DonationResponse makeADonation(DonationRequest newDonation) {
        Donation donation = mapper.map(newDonation, Donation.class);
        Donation madeDonation = donationRepo.save(donation);
        //Add B.L for DonationTable. Where You will map a user with their donation
        //Use email to find the donor who is making a donation and then add user's
        //id in the collection and update there donation list. In case it's users first donation
        //there email will not be present in the DonationTable. So make a new entry.
        User getUser = userRepo.findByEmail(donation.getDonorEmail())
                .orElseThrow(() -> new ResourceNotFoundException("No user Present with email "
                        + donation.getDonorEmail()));
        DonationTable donationTable = donationTableRepo.findByUserId(getUser.getId())
                .orElseGet(() -> new DonationTable(getUser.getId(), Collections.emptyList()));

        // Add the new donation ID to the existing list (avoiding duplicates)
        if (!donationTable.getDonationId().contains(madeDonation.getId())) {
            donationTable.getDonationId().add(madeDonation.getId());
        }

        // Save the updated DonationTable
        donationTableRepo.save(donationTable);
        return mapper.map(madeDonation, DonationResponse.class);
    }
}
