package com.toommi.demo.service.impl;


import com.toommi.demo.domain.RoleMenu;
import com.toommi.demo.domain.SystemMenu;
import com.toommi.demo.mapper.SystemMenuMapper;
import com.toommi.demo.service.ISystemMenuService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Service
public class SystemMenuServiceImpl extends BaseServiceImpl<SystemMenu> implements ISystemMenuService {
    @Autowired
    private SystemMenuMapper systemMenuMapper;

    /*	@Override
        public SystemMenu getOne(Long id) {
            SystemMenu systemMenu = systemMenuMapper.getOne(id);
            List<SystemMenu> list = systemMenuMapper.getAll();
            List<SystemMenu> children = systemMenu.getChildren();
            for (SystemMenu menu : list) {
                if(menu.getParent()!=null&&menu.getParent().getId()==systemMenu.getId()){
                    children.add(menu);
                }
            }
            return super.getOne(id);
        }*/
    @Override
    public List<SystemMenu> getAll() {
        List<SystemMenu> menus = systemMenuMapper.getAll();
        List<SystemMenu> list = systemMenuMapper.getAll();
        List<SystemMenu> newMenus = new ArrayList<>();
        //查询每个菜单的子菜单
        for (SystemMenu systemMenu : menus) {
            List<SystemMenu> children = systemMenu.getChildren();
            if (systemMenu.getParent() == null) {
                newMenus.add(systemMenu);
            }
            for (SystemMenu menu : list) {
                //对象要用equals
                if (menu.getParent() != null && menu.getParent().getId().equals(systemMenu.getId())) {
                    children.add(menu);
                }
            }
        }
        return newMenus;
    }

    @Override
    public void update(SystemMenu systemMenu) {
        systemMenuMapper.update(systemMenu);
        //把取消的菜单放入其他菜单
        SystemMenu findByName = systemMenuMapper.findByName(systemMenu.getName());
        systemMenu.setParent(findByName);
        systemMenuMapper.clearChildren(systemMenu);
        if (systemMenu.getChildren().size() != 0) {
            systemMenuMapper.saveChildren(systemMenu);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void save(SystemMenu systemMenu) {
        try {
            systemMenuMapper.save(systemMenu);
            if (systemMenu.getChildren().size() != 0) {
                systemMenuMapper.saveChildren(systemMenu);
            }
            RoleMenu rm = new RoleMenu();
            rm.setRole_id(1L);
            rm.setSystemmenu_id(systemMenu.getId());
            systemMenuMapper.saveRoleMenu(rm);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<SystemMenu> getMenuByLogin() {
        //获取登录人信息
        Subject currentUser = SecurityUtils.getSubject();
        String tel = (String) currentUser.getPrincipal();
        List<SystemMenu> menus = systemMenuMapper.getParentMenu();
        List<SystemMenu> list = systemMenuMapper.getMenuByLogin(tel);
        List<SystemMenu> newMenus = new ArrayList<>();
        //查询每个菜单的子菜单
        for (SystemMenu systemMenu : menus) {
            List<SystemMenu> children = systemMenu.getChildren();
            for (SystemMenu menu : list) {
                //对象要用equals
                if (menu.getParent() != null && menu.getParent().getId().equals(systemMenu.getId())) {
                    children.add(menu);
                }
            }
            //子菜单不为空的才会返回
            if (children.size() != 0) {
                newMenus.add(systemMenu);
            }
        }
        return newMenus;
    }

    @Override
    public List<SystemMenu> getMenu() {
        return systemMenuMapper.getMenu();
    }

    @Override
    public void delete(Serializable id) {
        systemMenuMapper.delete(id);
        systemMenuMapper.deleteRoleMenu(id);
    }
}
	
