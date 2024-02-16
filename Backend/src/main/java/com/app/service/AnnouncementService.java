package com.app.service;

import com.app.dto.AnnouncementList;
import com.app.dto.AnnouncementResponse;

import java.util.List;

public interface AnnouncementService {
    //Fetch data from AnnounceRequest collection with 'id' and then insert that into Announcement collection
    AnnouncementResponse addAnnouncement(String id);

    //List of announcements
    List<AnnouncementList> getAllAnnouncements();
}
