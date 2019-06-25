package com.toommi.demo.controller;

import com.toommi.demo.service.IUserService;
import com.toommi.demo.util.AjaxResult;
import com.toommi.demo.util.RedisUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 登录
 */
@Controller
public class LoginController {


    @Autowired
    private IUserService userService;
    @Autowired
    private RedisUtil redisUtil;

    // 显示登录页面
    @RequestMapping(method = RequestMethod.GET, value = "/login")
    public String login() {
        return "login.html";
    }

    // 注册页面
    @RequestMapping(method = RequestMethod.GET, value = "/register")
    public String register() {
        return "register";
    }

    /**
     * 登陆
     *
     * @param username
     * @param password
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResult login(String username, String password) {
        Subject currentUser = SecurityUtils.getSubject();
        String id = (String) currentUser.getSession().getId();
        AjaxResult result = null;
        // 如果当前用户没有认证,需要登录
        if (!currentUser.isAuthenticated()) {
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            try {
                // 跳转到Realm的身份认证：登录方法
                currentUser.login(token);
                return new AjaxResult("登录成功");
            } catch (UnknownAccountException uae) {
                // 用户名不存在
                result = new AjaxResult(300, "不存在该账号");
            } catch (IncorrectCredentialsException ice) {
                // 密码不对
                result = new AjaxResult(300, "请检查用户名或密码");
            } catch (LockedAccountException lae) {
                // 账户被锁定
                result = new AjaxResult(300, "账户被锁定,请联系管理员");
            } catch (AuthenticationException ae) {
                // 未知异常
                result = new AjaxResult(300, "网络繁忙,请稍后重试");
            }
        } else {
            result = new AjaxResult(999, "请不要重复登录");
        }
        currentUser.getSession().setTimeout(-1000L);

        return result;
    }

    /**
     * 后台退出登录
     *
     * @return
     */
    @RequestMapping("/logout")
    @ResponseBody
    public AjaxResult logout() {
        // 当前登录的用户，类似于HttpSession存储的account用户
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser.isAuthenticated()) {
            currentUser.logout();
        }
        return new AjaxResult("退出登录成功");
    }

}