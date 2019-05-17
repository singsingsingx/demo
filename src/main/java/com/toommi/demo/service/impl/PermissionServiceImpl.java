package com.toommi.demo.service.impl;


import com.toommi.demo.domain.Permission;
import com.toommi.demo.mapper.PermissionMapper;
import com.toommi.demo.service.IPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Service
public class PermissionServiceImpl extends BaseServiceImpl<Permission> implements IPermissionService {

	@Autowired
    PermissionMapper permissionMapper;

	@Override
	@Transactional
	public void save(Permission permission) {
		permissionMapper.save(permission);
		if(permission.getResources().size()!=0){
			permissionMapper.saveResource(permission);
		}
	}

	@Override
	@Transactional
	public void delete(Serializable id) {
		permissionMapper.deleteResource(id);
		permissionMapper.deleteRole(id);
		permissionMapper.delete(id);
	}

	@Override
	public void update(Permission permission) {
		permissionMapper.update(permission);
		permissionMapper.deleteResource(permission.getId());
		if(permission.getResources().size()!=0){
			permissionMapper.saveResource(permission);
		}

	}

    @Override
    public List<Map<String, String>> getAllPerRes() {
        return permissionMapper.getAllPerRes();
    }

    @Override
    public List<String> getResNameByuser(String tel) {
        return permissionMapper.getResNameByuser(tel);
    }



}
