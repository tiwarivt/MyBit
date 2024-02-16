package com.app.service;

import com.app.repository.DonationTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DonationTableServiceImpl implements DonationTableService{

    @Autowired
    DonationTableRepository donationTableRepo;
}
