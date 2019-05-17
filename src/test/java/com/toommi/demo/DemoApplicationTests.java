package com.toommi.demo;

import com.toommi.demo.util.MD5PasswordCreate;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	@Test
	public void contextLoads() {
        String s = MD5PasswordCreate.passwordEncryption("abcdefg", "admin");
        System.err.println(s);

    }

}
