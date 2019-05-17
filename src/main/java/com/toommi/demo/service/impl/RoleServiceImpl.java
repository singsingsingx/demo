package com.toommi.demo.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.toommi.demo.domain.Role;
import com.toommi.demo.domain.SystemMenu;
import com.toommi.demo.mapper.RoleMapper;
import com.toommi.demo.mapper.SystemMenuMapper;
import com.toommi.demo.service.IRoleService;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements IRoleService {
	@Autowired
	private RoleMapper roleMapper;
	@Autowired
	private SystemMenuMapper systemMenuMapper;
	
	@Override
	public Role get(Serializable id) {
		Role role = roleMapper.get(id);
		List<SystemMenu> menus = role.getMenus();
		List<SystemMenu> list = systemMenuMapper.getAll();
		List<SystemMenu> newMenus =new ArrayList<>();
		//查询每个菜单的子菜单
		for (SystemMenu systemMenu : menus) {
			List<SystemMenu> children = systemMenu.getChildren();
			if(systemMenu.getParent()==null){
				newMenus.add(systemMenu);
			}
			for (SystemMenu menu : list) {
				if(menu.getParent()!=null&&menu.getParent().getId()==systemMenu.getId()){
					children.add(menu);
				}
			}
		}
		menus=newMenus;
		return role;
	}
	@Override
	@Transactional
	public void save(Role role) {
		role.setUpdateTime(new Date());
		roleMapper.save(role);
		if(role.getPermissions().size()!=0){
			roleMapper.savePermission(role);
		}
		if(role.getMenus().size()!=0){
			roleMapper.saveSystemmenu(role);
		}
	}

	@Override	
	public void delete(Serializable id) {
		roleMapper.deletePermission(id);
		roleMapper.deleteSystemmenu(id);
		roleMapper.delete(id);
	}

	@Override
	@Transactional
	public void update(Role role) {
		role.setUpdateTime(new Date());
		roleMapper.update(role);
		roleMapper.deletePermission(role.getId());
		if(role.getPermissions().size()!=0){
			roleMapper.savePermission(role);
		}
		if(role.getMenus().size()!=0){
			roleMapper.saveSystemmenu(role);
		}
	}
	
	
	
	//查询roleMenu
	@Override
	public List<Role> getRoleMenu() {
		
		return roleMapper.getRoleMenu();
	}

	
	
	
	//查询所有权限
	@Override
	public List<Role> getAllRole() {
		return roleMapper.getAllRole();
	}

    @Override
    public Set<Role> findByUserId(Long id) {
	    return roleMapper.findByUserId(id);
    }

    @Override
    public String getRoleName(Long roleId) {
        return roleMapper.getRoleName(roleId);
    }
}
