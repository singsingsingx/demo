package com.toommi.demo.service;


import com.toommi.demo.domain.SystemMenu;

import java.util.List;

public interface ISystemMenuService extends IBaseService<SystemMenu>{
	List<SystemMenu> getMenuByLogin();

	List<SystemMenu> getMenu();
	
}
