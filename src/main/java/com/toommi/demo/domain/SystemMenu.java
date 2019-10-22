package com.toommi.demo.domain;

import lombok.Data;
import lombok.NonNull;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@NonNull
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

	
}
