package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

@Data
@ToString
@NonNull
public class Resource {


    private Long id;
    //资源名称
    private String name;
    //资源地址
    private String url;


}
