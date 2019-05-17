package com.toommi.demo.mapper;

import com.toommi.demo.domain.Permission;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface PermissionMapper extends BaseMapper<Permission> {
    //保存对应的资源
    void saveResource(Permission permission);

    //解除角色关联
    void deleteRole(Serializable id);

    //解除资源关联
    void deleteResource(Serializable id);

    //拿到所有权限对应的资源名和地址
    List<Map<String, String>> getAllPerRes();

    //根据用户名拿到对应权限的资源名
    List<String> getResNameByuser(String username);
}
