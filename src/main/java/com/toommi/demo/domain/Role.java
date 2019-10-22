package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@ToString
@NonNull
public class Role {
    private Long id;
    // 角色编号 必填
    private String sn = "";
    // 角色名称 必填
    private String name;
    // 创建时间
    private Date updateTime;
    // 权限
    private List<Permission> permissions = new ArrayList<Permission>();
    // 菜单
    private List<SystemMenu> menus = new ArrayList<>();


}
