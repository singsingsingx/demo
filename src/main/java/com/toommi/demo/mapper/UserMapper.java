package com.toommi.demo.mapper;

import com.toommi.demo.domain.Account;
import com.toommi.demo.domain.User;
import com.toommi.demo.query.UserQuery;
import com.toommi.demo.util.LayResult;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface UserMapper extends BaseMapper<User> {


    public List<Map<String, Object>> getStall(UserQuery query);

    @Select("SELECT * from account WHERE tel=#{username}")
    User findbyUsername(String username);



    @Select("select id,name username, tel, password,salt, state getMemberMoney,img isNo from user limit #{page},#{limit}")
    List<Map<String ,Object>> selectAccount(@Param("page") Integer page, @Param("limit") Integer limit);

    @Select("select * from account where tel=#{userName}")
    Account findByTel(String userName);
}
