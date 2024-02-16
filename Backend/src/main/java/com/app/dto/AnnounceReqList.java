package com.app.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class AnnounceReqList {
    private String id;
    private String ngoName;
    private String req;
    private String date;
}

