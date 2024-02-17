package com.app.service;

import com.app.dto.DonationTableResponse;
import com.app.enities.Donation;
import com.app.repository.DonationRepository;
import com.app.repository.DonationTableRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DonationTableServiceImpl implements DonationTableService {

    @Autowired
    DonationTableRepository donationTableRepo;

    @Autowired
    DonationRepository donationRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public List<DonationTableResponse> getAllDonationDoneByDonor(String email) {
        List<Donation> donationList = donationRepo.findAllByDonorEmail(email);
        List<DonationTableResponse> responseList = donationList.stream()
                .map(donation -> mapper.map(donation, DonationTableResponse.class))
                .collect(Collectors.toList());
        return responseList;
    }
}
