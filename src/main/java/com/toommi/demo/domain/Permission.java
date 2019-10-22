package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@NonNull
public class Permission {
    private Long id;
    // 名称
    private String name;
    // 资源地址
    List<Resource> resources = new ArrayList<>();

}
