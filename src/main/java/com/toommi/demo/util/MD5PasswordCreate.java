package com.toommi.demo.util;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

public class MD5PasswordCreate {

	public static String passwordEncryption(String password,String salt) {
		 //加密方式
        String algorithmName="MD5";

        //加密的字符串
        String source=password;

        //盐值，用于和密码混合起来用
        ByteSource byteSource = ByteSource.Util.bytes(salt);

        //加密的次数,可以进行多次的加密操作
        int hashIterations = 1000;

        //通过SimpleHash 来进行加密操作
        SimpleHash hash = new SimpleHash(algorithmName, source, byteSource, hashIterations);

		
		return hash.toString();
	}
	
	
}
