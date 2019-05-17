package com.toommi.demo.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Role {
	private Long id;
	// 角色编号 必填
	private String sn = "";
	// 角色名称 必填
	private String name;
	// 创建时间
	private Date updateTime;
	// 权限
	private List<Permission> permissions = new ArrayList<Permission>();
	// 菜单
	private List<SystemMenu> menus = new ArrayList<>();

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public List<SystemMenu> getMenus() {
		return menus;
	}

	public void setMenus(List<SystemMenu> menus) {
		this.menus = menus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone="GMT+8")
	public Date getUpdateTime() {
		return updateTime;
	}

	@DateTimeFormat(pattern="yyyy-MM-dd")
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

}
