package com.toommi.demo.query;

/**
 * 查询父类
 *
 */
public class BaseQuery {

	private int page = 1;// 当前页码(默认第一页)
	private int rows = 10;// 每页多少条数据(默认10条)
	private String q;// 存放条件
	private String order ="asc";
	private String sort ="o.id";
	

	// 提供2个方法给mapper
	public int getBegin() {
		return (page - 1) * rows;
	}

	public int getEnd() {
		return rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getQ() {
		return q;
	}

	public void setQ(String q) {
		this.q = q;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	@Override
	public String toString() {
		return "BaseQuery [page=" + page + ", rows=" + rows + ", q=" + q + ", order=" + order + ", sort=" + sort + "]";
	}

}
