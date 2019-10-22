package com.toommi.demo.config;

import com.toommi.demo.interceptor.MyInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

/**
 * @Author jiaorpeng
 * @Date 19.10.22
 * @params
 * @return
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Resource
    MyInterceptor myInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 拦截所有请求
        registry.addInterceptor(myInterceptor).addPathPatterns("/**");
    }


}
