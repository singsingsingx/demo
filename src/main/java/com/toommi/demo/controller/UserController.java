package com.toommi.demo.controller;

import com.toommi.demo.query.UserQuery;
import com.toommi.demo.service.IUserService;
import com.toommi.demo.util.AjaxResult;
import com.toommi.demo.util.LayResult;
import com.toommi.demo.util.RedisUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Autowired(required = false)
    private IUserService userService;
    @Autowired
    private RedisUtil redisUtil;

    @RequestMapping(value = "/account")
    public String account(){
        return "account";
    }
    @RequestMapping(value = "/role")
    public String role(){
        return "role";
    }

    @RequestMapping(value = "/user")
    public String user(Model model){
        Subject currentUser = SecurityUtils.getSubject();

        model.addAttribute("abc",(String)currentUser.getPrincipal());

        return "user";
    }

//    @RequiresRoles(value = {"roles[user]"})
    @RequestMapping(value = "/abc")
    @ResponseBody
    public AjaxResult abc(UserQuery query){
//        Subject subject = SecurityUtils.getSubject();
//        String abc = redisUtil.get("abc");
//        redisUtil.set("u","zheshiabcdf");
       return userService.getStall(query);
    }


    @RequestMapping(value = "/userJson")
    @ResponseBody
    public AjaxResult userJson(UserQuery query){
//        System.out.println("呵呵"+redisUtil.get("u"));
//        redisUtil.setex("abc", 10, "abcbefghijklmnopq");

        String abc =  redisUtil.get("abc");


        System.err.println(abc);
        return userService.getStall(query);
    }
    @RequestMapping(value = "/selectAccount")
    @ResponseBody
    public LayResult selectAccount(Integer page, Integer limit){
        return userService.selectAccount(page,limit);
    }
}
