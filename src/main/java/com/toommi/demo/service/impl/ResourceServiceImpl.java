package com.toommi.demo.service.impl;

import com.toommi.demo.mapper.ResourceMapper;
import com.toommi.demo.service.IResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class ResourceServiceImpl extends BaseServiceImpl<Resource> implements IResourceService {
	
	@Autowired
    private ResourceMapper resourceMapper;
	@Override
	@Transactional
	public void delete(Serializable id) {
		resourceMapper.deletePermission(id);
		resourceMapper.delete(id);
	}

	
}
