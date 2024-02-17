package com.app.controller;

import com.app.dto.DonationRequest;
import com.app.dto.DonationResponse;
import com.app.dto.DonationTableResponse;
import com.app.service.DonationService;
import com.app.service.DonationTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    DonationService donationService;

    @Autowired
    DonationTableService donationTableService;

    @GetMapping("/list")
    ResponseEntity<?> getDonationList() {
        List<DonationResponse> donationList = donationService.getDonationList();
        return ResponseEntity.ok(donationList);
    }

    @PostMapping("/makeDonation")
    ResponseEntity<?> makeDonation(@RequestBody DonationRequest donation) {
        DonationResponse donationResponse = donationService.makeADonation(donation);
        return ResponseEntity.ok(donationResponse);
    }

    //For getting list of donation made by a particular person
    //Taking email as input so that we can use it as unique identifier
    @GetMapping("/{email}")
    ResponseEntity<?> getDonorDonationList(@PathVariable String email) {
        //Donation table id to frontend.
        List<DonationTableResponse> responseList = donationTableService
                .getAllDonationDoneByDonor(email);
        return ResponseEntity.ok(responseList);
    }

/*    @GetMapping("/payment/{amount}")
    ResponseEntity<?> payment(@PathVariable int amount) {
        return null;
    }*/

}
