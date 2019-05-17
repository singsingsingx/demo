package com.toommi.demo.query;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页对象
 */
public class PageList {

	private int total;// 总数据条数
	private List rows = new ArrayList();// 当前页数据

	public PageList() {

	}

	public PageList(int total, List rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

	@Override
	public String toString() {
		return "PageList [total=" + total + ", rows=" + rows + "]";
	}

}
