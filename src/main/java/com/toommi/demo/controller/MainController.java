package com.toommi.demo.controller;

import com.toommi.demo.domain.SystemMenu;
import com.toommi.demo.service.ISystemMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/main")
public class MainController {

    @Autowired
    private ISystemMenuService systemMenuService;

    @RequestMapping(value = "/list")
    public String list(){
        System.err.println("main/list");
        return "main";
    }

    /* 获取当前用户的菜单数据 */
    @RequestMapping("/left")
    @ResponseBody
    public List<SystemMenu> left() {
        return systemMenuService.getMenuByLogin();
    }

}
