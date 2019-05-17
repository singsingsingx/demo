package com.toommi.demo.mapper;

import com.toommi.demo.domain.RoleMenu;
import com.toommi.demo.domain.SystemMenu;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import java.io.Serializable;
import java.util.List;


public interface SystemMenuMapper extends BaseMapper<SystemMenu>{
	SystemMenu findByName(String name);
	//保存子菜单
	void saveChildren(SystemMenu systemMenu);
	//清除子菜单
	void clearChildren(SystemMenu systemMenu);
	//根据登录用户查询菜单
	List<SystemMenu> getMenuByLogin(String username);
	//查询父级菜单
	@Select("select * from systemmenu where parent_id is null order by serial ")
	List<SystemMenu> getParentMenu();
	
	List<SystemMenu> getMenu();
	
	//保存角色菜单表
	void saveRoleMenu(RoleMenu role);
	//删除
	@Delete("delete from role_systemmenu where systemmenu_id=#{id}")
	void deleteRoleMenu(Serializable id);
}
