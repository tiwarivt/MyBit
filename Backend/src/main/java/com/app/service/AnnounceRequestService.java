package com.app.service;

import com.app.dto.AnnounceReqList;
import com.app.dto.AnnounceReqResp;
import com.app.dto.AnnounceRequestInsert;

import java.util.List;

public interface AnnounceRequestService {
    //Add request to Announce Request Table table
    AnnounceReqResp makeAnnouncementRequest(AnnounceRequestInsert req);

    //Get list of announcement
    List<AnnounceReqList> getAllAnnouncementRequest();
}
