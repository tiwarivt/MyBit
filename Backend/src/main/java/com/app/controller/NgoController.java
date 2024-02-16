package com.app.controller;

import com.app.dto.AnnounceReqResp;
import com.app.dto.AnnounceRequestInsert;
import com.app.dto.NgoList;
import com.app.dto.NgoResponse;
import com.app.service.AnnounceRequestService;
import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ngo")
public class NgoController {

    @Autowired
    UserService userService;

    @Autowired
    AnnounceRequestService announceRequestService;

    @GetMapping("/list")
    ResponseEntity<?> getNgoList() {
        List<NgoList> ngoList = userService.getAllNgo();
        return ResponseEntity.ok(ngoList);
    }

    @GetMapping("/{name}/info")
    ResponseEntity<?> getNgoInfo(@PathVariable String name) {
        NgoResponse resp = userService.getNgoByName(name);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/request")
    ResponseEntity<?> makeAnnounceRequest(@RequestBody AnnounceRequestInsert request) {
        AnnounceReqResp resp = announceRequestService.makeAnnouncementRequest(request);
        return ResponseEntity.ok(resp);
    }
}


