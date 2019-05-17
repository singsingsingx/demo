package com.toommi.demo.domain;

import java.util.ArrayList;
import java.util.List;

public class SystemMenu {
	private Long id;
	//菜单编号 必填
	private String sn="";
	//菜单名称 必填
	private String name;
	//上级菜单
	private SystemMenu parent;
	//子菜单
	private List<SystemMenu>  children = new ArrayList<>();
	//图标
	private String icon;
	//地址
	private String url;
	//简介
	private String intro;
	
	public String getSn() {
		return sn;
	}
	public void setSn(String sn) {
		this.sn = sn;
	}
	public String getName() {
		return name;
	}
	public String getText() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public SystemMenu getParent() {
		return parent;
	}
	public void setParent(SystemMenu parent) {
		this.parent = parent;
	}
	public String getIcon() {
		return icon;
	}
	public String getIconCls() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<SystemMenu> getChildren() {
		return children;
	}
	public void setChildren(List<SystemMenu> children) {
		this.children = children;
	}
	
}
