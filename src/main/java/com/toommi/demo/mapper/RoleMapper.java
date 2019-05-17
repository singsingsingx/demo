package com.toommi.demo.mapper;

import com.toommi.demo.domain.Role;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

public interface RoleMapper extends BaseMapper<Role> {
    // 保存权限中间表
    void savePermission(Role role);

    // 保存菜单中间表
    void saveSystemmenu(Role role);

    // 删除权限中间表
    void deletePermission(Serializable id);

    // 删除权限中间表
    void deleteSystemmenu(Serializable id);

    // 查询用户权限
    List<Role> getRole(Long roleId);

    //查询所有权限
    List<Role> getAllRole();

    List<Role> getRoleMenu();

    @Select("select role_id from role_systemMenu where role_id = #{id}")
    List<Long> findMenu(Long id);

    @Delete("delete from role_systemMenu where role_id = #{role_id}")
    void deleteMenu(Long role_id);

    @Select("SELECT o.* FROM role o LEFT JOIN role_account ra on ra.role_id = o.id LEFT JOIN " +
            "account a on a.id = ra.account_id where a.id = #{id}")
    Set<Role> findByUserId(Long id);

    @Select("SELECT name from role where id = #{roleId}")
    String getRoleName(Long roleId);
}
