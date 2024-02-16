package com.app.controller;

import com.app.dto.*;
import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/add/ngo")
    ResponseEntity<?> addNgo(@RequestBody NgoInsertRequest newNgo) {
        //Check if role is equal to ROLE_ADMIN
        if (newNgo.getRole().name().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new APIResponse("Can't Add Admin"));
        } else {
            NgoResponse resp = userService.addNgo(newNgo);
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }
    }

    @PostMapping("/add/donor")
    ResponseEntity<?> addDonor(@RequestBody DonorInsertRequest newDonor) {
        if (newDonor.getRole().name().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new APIResponse("Can't Add Admin"));
        } else {
            DonorResponse resp = userService.addUser(newDonor);
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }
    }
}
