package com.app.repository;

import com.app.enities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<List<User>> findByCity(String city);

    Optional<User> findByEmail(String email);

    Optional<List<User>> findByRole(String role);

    Optional<User> findByFirstName(String firstName);
}
