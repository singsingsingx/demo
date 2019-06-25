package com.toommi.demo.config;

import com.toommi.demo.service.IPermissionService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * 权限 拦截策略
 */
@Component
public class URLPathMatchingFilter extends PathMatchingFilter {
    @Autowired
    IPermissionService permissionService;

    public static URLPathMatchingFilter testUtils;

    //    上面的 @Autowired 注入失败 使用此方式
    @PostConstruct
    public void init() {
        testUtils = this;
    }

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {


        //请求的url
        String requestURL = getPathWithinApplication(request);
        System.out.println("请求的url :" + requestURL);
        Subject subject = SecurityUtils.getSubject();
        if (!subject.isAuthenticated()) {

            //保存当前地址并重定向到登录界面
            HttpServletRequest req = (HttpServletRequest) request;
            HttpServletResponse resp = (HttpServletResponse) response;
            saveRequestAndRedirectToLogin(req, resp);
            return false;

        }

        String principal = (String) subject.getPrincipal();
//        List<String> resNameByuser = testUtils.permissionService.getResNameByuser(principal);

        List<String> resourceByLogin = testUtils.permissionService.getResourceByLogin(principal);

        boolean hasPermission = false;
        for (String s : resourceByLogin) {
            if (requestURL.equals(s)) {
                hasPermission = true;
                break;
            }
        }

        if (hasPermission) {
            return true;
        } else {
            UnauthorizedException ex = new UnauthorizedException("当前用户没有访问路径" + requestURL + "的权限");
            subject.getSession().setAttribute("ex", ex);
//            WebUtils.issueRedirect(request, response, "/403.html");


            HttpServletRequest httpRequest = (HttpServletRequest) request;
            String xhr = httpRequest.getHeader("X-Requested-With");
            if ("XMLHttpRequest".equalsIgnoreCase(xhr)) {
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.setContentType("application/json; charset=UTF-8");
                PrintWriter writer = httpServletResponse.getWriter();
                writer.print("{\"code\":400,\"count\":null,\"msg\":\"无权限\",\"object\":null}");
            } else {
                WebUtils.issueRedirect(request, response, "/403.html");
            }
            return false;

        }

    }

    private void saveRequestAndRedirectToLogin(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        WebUtils.saveRequest(req);
        WebUtils.issueRedirect(req, resp, "/login.html");
    }
}