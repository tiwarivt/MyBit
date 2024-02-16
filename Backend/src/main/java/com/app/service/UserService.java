package com.app.service;

import com.app.dto.*;

import java.util.List;

public interface UserService {

    //To add a Donor in Database. Send response via a DTO
    DonorResponse addUser(DonorInsertRequest newDonor);

    //To add a NGO in Database. Send response via a DTO
    NgoResponse addNgo(NgoInsertRequest newNgo);

    //Get List Of all users
    List<UserList> getUserList();

    //Get List Of Users By City
    List<UserList> getUserByCity(String city);

    //Get List of all NGOs.
    List<NgoList> getAllNgo();

    //Get NGO by Name
    NgoResponse getNgoByName(String name);

    //

}
