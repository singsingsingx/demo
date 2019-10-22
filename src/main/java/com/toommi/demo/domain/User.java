package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

@Data
@ToString
@NonNull
public class User {

    private Long id;
    private String name;
    private String tel;
    private String password;
    private Integer state;
    private String salt;

}


