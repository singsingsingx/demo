package com.toommi.demo.service.impl;

import com.toommi.demo.domain.Account;
import com.toommi.demo.domain.User;
import com.toommi.demo.mapper.UserMapper;
import com.toommi.demo.query.UserQuery;
import com.toommi.demo.service.IUserService;
import com.toommi.demo.util.AjaxResult;
import com.toommi.demo.util.LayResult;
import com.toommi.demo.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService extends BaseServiceImpl<User> implements IUserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public AjaxResult getStall(UserQuery query) {

        List<Map<String, Object>> stall = userMapper.getStall(query);

        List<Map<String, Object>> maps = Result.resultReturn(stall);
        return new AjaxResult(maps);
    }

    @Override
    public User findbyUsername(String username) {

        return userMapper.findbyUsername(username);
    }

    @Override
    public LayResult selectAccount(Integer page, Integer limit) {
        List<Map<String, Object>> maps = userMapper.selectAccount(page, limit);
        Result.resultReturn(maps);
        return new LayResult(3, maps);

    }

    @Override
    public Account findByTel(String userName) {
        return userMapper.findByTel(userName);
    }
}

