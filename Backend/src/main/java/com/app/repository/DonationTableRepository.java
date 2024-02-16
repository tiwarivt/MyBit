package com.app.repository;

import com.app.enities.DonationTable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DonationTableRepository extends MongoRepository<DonationTable, String> {
    Optional<DonationTable> findByUserId(String id);
}
