package com.toommi.demo.query;

/**
 * 子类查询条件
 * @author Administrator
 *
 */
public class RoleQuery extends BaseQuery{

	private String name;
	
	private String sn;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}
	
	
}
