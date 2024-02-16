package com.app.repository;

import com.app.enities.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonationRepository extends MongoRepository<Donation,String> {
}
