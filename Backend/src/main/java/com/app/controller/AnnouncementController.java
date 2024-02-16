package com.app.controller;

import com.app.dto.AnnouncementList;
import com.app.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/announcement")
public class AnnouncementController {

    @Autowired
    AnnouncementService announcementService;

    @GetMapping("/list")
    ResponseEntity<?> getAnnouncementList() {
        List<AnnouncementList> respList = announcementService.getAllAnnouncements();
        return ResponseEntity.ok(respList);
    }

}
