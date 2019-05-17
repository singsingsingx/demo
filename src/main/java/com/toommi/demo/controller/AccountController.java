package com.toommi.demo.controller;

import com.toommi.demo.service.IUserService;
import com.toommi.demo.util.LayResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/account")
public class AccountController {

    @Autowired
    private IUserService userService;


    @RequestMapping(value = "/abc")
    @ResponseBody
    public LayResult abc(){
        return userService.selectAccount(0, 10);
    }

}
