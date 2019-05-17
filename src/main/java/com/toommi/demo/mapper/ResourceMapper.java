package com.toommi.demo.mapper;

import javax.annotation.Resource;
import java.io.Serializable;

public interface ResourceMapper extends BaseMapper<Resource> {

    void deletePermission(Serializable id);

}
