package com.app.repository;

import com.app.enities.AnnounceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnnounceRequestRepository extends MongoRepository<AnnounceRequest, String> {

}
