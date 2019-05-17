package com.toommi.demo.service.impl;

import com.toommi.demo.mapper.BaseMapper;
import com.toommi.demo.query.BaseQuery;
import com.toommi.demo.query.PageList;
import com.toommi.demo.service.IBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;


@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class BaseServiceImpl<T> implements IBaseService<T> {

    @Autowired
    private BaseMapper<T> baseMapper;

    @Override
    @Transactional
    public void save(T t) {
        baseMapper.save(t);
    }

    @Override
    @Transactional
    public void delete(Serializable id) {
        baseMapper.delete(id);
    }

    @Override
    @Transactional
    public void update(T t) {
        baseMapper.update(t);
    }

    @Override
    public T get(Serializable id) {
        return baseMapper.get(id);
    }

    @Override
    public List<T> getAll() {
        return baseMapper.getAll();
    }

    @Override
    public PageList findPageByQuery(BaseQuery baseQuery) {
        int total = baseMapper.findCountByQuery(baseQuery);
        if (total == 0) {
            return new PageList();
        }
        List<T> rows = baseMapper.findLimitByQuery(baseQuery);
        return new PageList(total, rows);
    }

}
