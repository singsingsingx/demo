package com.toommi.demo.config;

import com.toommi.demo.domain.Account;
import com.toommi.demo.service.IPermissionService;
import com.toommi.demo.service.IUserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


/**
 *  realm
 */
public class UserRealm extends AuthorizingRealm {
    @Autowired
    private IUserService userService;
    @Autowired
    private IPermissionService permissionService;

    /**
     * 提供用户信息，返回权限信息
     *
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String tel = (String) getAvailablePrincipal(principals);
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        // 通过用户名从数据库获取权限字符串
//        List<String> res = permissionService.getResNameByuser(tel);

//        info.addStringPermissions(res);

        Set<String> set = new HashSet<String>();
//        set.add("users");
//        info.setRoles(set);

        set.add("user");
        info.setStringPermissions(set);

        return info;
    }

    /**
     * 提供帐户信息，返回认证信息
     *
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String userName = (String) authenticationToken.getPrincipal();
        Account user = userService.findByTel(userName);
        if (user == null) {
            //用户不存在就抛出异常
            throw new UnknownAccountException();
        }
        if (user.getState() != 1) {
            //用户被锁定就抛异常
            throw new LockedAccountException();
        }
        System.err.println(getName());
        //密码可以通过SimpleHash加密，然后保存进数据库。
        //此处是获取数据库内的账号、密码、盐值，保存到登陆信息info中
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                user.getTel(),  //
                user.getPassword(),  //密码
                ByteSource.Util.bytes(user.getSalt()), //盐
                getName());                   //realm name

        return authenticationInfo;
    }


}