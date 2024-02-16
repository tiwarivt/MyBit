package com.app.service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.AnnounceReqList;
import com.app.dto.AnnounceReqResp;
import com.app.dto.AnnounceRequestInsert;
import com.app.enities.AnnounceRequest;
import com.app.repository.AnnounceRequestRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnnounceRequestServiceImpl implements AnnounceRequestService {

    @Autowired
    AnnounceRequestRepository announceRequestRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public AnnounceReqResp makeAnnouncementRequest(AnnounceRequestInsert req) {
        AnnounceRequest request = mapper.map(req, AnnounceRequest.class);
        try {
            announceRequestRepo.save(request);
            return new AnnounceReqResp("Request Added");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error in adding Announce Request");
        }
    }

    @Override
    public List<AnnounceReqList> getAllAnnouncementRequest() {
        List<AnnounceRequest> list = announceRequestRepo.findAll();
        List<AnnounceReqList> resp = list.stream()
                .map(announceRequest -> mapper.map(announceRequest, AnnounceReqList.class))
                .collect(Collectors.toList());
        return resp;
    }
}
