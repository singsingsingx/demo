package com.toommi.demo.domain;

import java.util.ArrayList;
import java.util.List;

public class Permission {
	private Long id;
	// 名称 
	private String name;
	// 资源地址 
	List<Resource> resources = new ArrayList<>();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Resource> getResources() {
		return resources;
	}

	public void setResources(List<Resource> resources) {
		this.resources = resources;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
