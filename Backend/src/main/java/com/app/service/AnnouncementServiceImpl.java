package com.app.service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.AnnouncementList;
import com.app.dto.AnnouncementResponse;
import com.app.enities.AnnounceRequest;
import com.app.enities.Announcement;
import com.app.repository.AnnounceRequestRepository;
import com.app.repository.AnnouncementRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    AnnouncementRepository announcementRepo;

    @Autowired
    AnnounceRequestRepository announceRequestRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public AnnouncementResponse addAnnouncement(String id) {
        System.out.println(id);
        AnnounceRequest announceReq = announceRequestRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement Request With that ID not found"));
        Announcement newAnnouncement = new Announcement(announceReq.getNgoName(), announceReq.getReq(), announceReq.getDate());
        announcementRepo.save(newAnnouncement);
        announceRequestRepo.delete(announceReq);
        AnnouncementResponse resp = new AnnouncementResponse("Announcement Added");
        return resp;
    }

    @Override
    public List<AnnouncementList> getAllAnnouncements() {
        List<Announcement> list = announcementRepo.findAll();
        List<AnnouncementList> resp = list.stream()
                .map(announcement -> mapper.map(announcement, AnnouncementList.class))
                .collect(Collectors.toList());
        return resp;
    }
}
