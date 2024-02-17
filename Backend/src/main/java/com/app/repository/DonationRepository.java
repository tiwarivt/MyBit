package com.app.repository;

import com.app.enities.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DonationRepository extends MongoRepository<Donation, String> {
    List<Donation> findAllByDonorEmail(String email);
}
