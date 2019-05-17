package com.toommi.demo.service;

import com.toommi.demo.domain.Account;
import com.toommi.demo.domain.User;
import com.toommi.demo.query.UserQuery;
import com.toommi.demo.util.AjaxResult;
import com.toommi.demo.util.LayResult;

public interface IUserService extends IBaseService<User> {


    AjaxResult getStall(UserQuery query);

    User findbyUsername(String username);

    LayResult selectAccount(Integer page, Integer limit);

    Account findByTel(String userName);
}
