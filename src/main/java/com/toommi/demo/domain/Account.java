package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
@NonNull
public class Account {

    private Long id;
    private String username;
    private String tel;
    private String password;
    private Integer state;
    private String salt;
    private String img;
    private Integer sign;
    private Date createTime;

}
