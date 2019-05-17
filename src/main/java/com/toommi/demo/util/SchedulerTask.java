package com.toommi.demo.util;

import com.toommi.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchedulerTask {

    @Autowired
    private IUserService userService;

    @Scheduled(cron = "*/6 * * * * ?")
    public void task(){
//        List<User> all = userService.getAll();

        System.err.println(System.currentTimeMillis()+"   激光打印");

    }

    @Scheduled(fixedDelay = 2000,initialDelayString = "3000")
    public void taskOne(){
        System.out.println(System.currentTimeMillis()+"   快速打印");
    }

}
