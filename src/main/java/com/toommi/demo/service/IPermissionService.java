package com.toommi.demo.service;


import com.toommi.demo.domain.Permission;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public interface IPermissionService extends IBaseService<Permission>{

    List<Map<String,String>> getAllPerRes();

    List<String> getResNameByuser(String tel);
}
