package com.toommi.demo.service;


import com.toommi.demo.domain.Role;

import java.util.List;
import java.util.Set;

public interface IRoleService extends IBaseService<Role> {
	// 查询所有权限
	List<Role> getAllRole();

	List<Role> getRoleMenu();

	//获取用户权限
    Set<Role> findByUserId(Long id);

    String getRoleName(Long roleId);
}
