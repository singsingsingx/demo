package com.toommi.demo.mapper;


import com.toommi.demo.query.BaseQuery;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

public interface BaseMapper<T> {

    public void save(T t);

    public void delete(Serializable id);

    public void update(T t);

    public T get(Serializable id);

    public List<T> getAll();

    public Integer findCountByQuery(BaseQuery baseQuery);// 根据条件查询数据总条数

    public List<T> findLimitByQuery(BaseQuery baseQuery);// 根据条件查询数据
}
