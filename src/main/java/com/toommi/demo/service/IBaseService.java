package com.toommi.demo.service;

import com.toommi.demo.query.BaseQuery;
import com.toommi.demo.query.PageList;

import java.io.Serializable;
import java.util.List;


public interface IBaseService<T> {

    public void save(T t);

    /**
     * Serializable 序列化
     *
     * @param id
     */
    public void delete(Serializable id);

    public void update(T t);

    public T get(Serializable id);

    public List<T> getAll();

    public PageList findPageByQuery(BaseQuery baseQuery);


}
