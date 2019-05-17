package com.toommi.demo.util;

import com.toommi.demo.domain.User;
import com.toommi.demo.service.IPermissionService;
import com.toommi.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

//@Component
public class SchedulerTask {

    @Autowired
    private IUserService userService;
    @Autowired
    private IPermissionService permissionService;

    @Scheduled(cron = "*/6 * * * * ?")
    public void task(){
        List<User> all = userService.getAll();

        List<Map<String, String>> allPerRes = permissionService.getAllPerRes();
        for (Map<String, String> allPerRe : allPerRes) {
            System.out.println(allPerRe);
        }

        System.err.println(System.currentTimeMillis()+"   激光打印");

    }

    @Scheduled(fixedDelay = 2000,initialDelayString = "3000")
    public void taskOne(){
        System.out.println(System.currentTimeMillis()+"   快速打印");
    }

}
