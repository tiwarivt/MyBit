package com.app.controller;

import com.app.dto.AnnounceReqList;
import com.app.dto.AnnouncementResponse;
import com.app.dto.UserList;
import com.app.service.AnnounceRequestService;
import com.app.service.AnnouncementService;
import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    UserService userService;

    @Autowired
    AnnounceRequestService announceReqService;

    @Autowired
    AnnouncementService announcementService;

    @GetMapping("/users")
    ResponseEntity<?> getAllUsers() {
        List<UserList> list = userService.getUserList();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/users/{city}")
    ResponseEntity<?> getUsersByCity(@PathVariable String city) {
        List<UserList> list = userService.getUserByCity(city);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/announceReq/list")
    ResponseEntity<?> getAllAnnouncementRequest() {
        List<AnnounceReqList> list = announceReqService.getAllAnnouncementRequest();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/addannouncement/{id}")
    ResponseEntity<?> approveAnnouncementReq(@PathVariable String id) {
        AnnouncementResponse addedAnnouncement = announcementService.addAnnouncement(id);
        return ResponseEntity.ok(addedAnnouncement);
    }
}
