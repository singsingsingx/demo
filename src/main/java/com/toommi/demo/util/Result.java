package com.toommi.demo.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * 处理返回json问题(没有值显示为null.而不是不显示)
 *
 * @author
 */
public class Result {

    /**
     * 返回json中没有值的设置为null,而不是不显示
     *
     * @param list 传入的需要判断的list
     * @return 处理完的数据
     */
    public static List<Map<String, Object>> resultReturn(List<Map<String, Object>> list) {

        if (list == null || list.size() == 0) {
            return list;
        }

        Map<Integer, String> map1 = new HashMap<>();

        // 统计有多少个key
        Integer i = new Integer(0);

        // 循环计算key的数量
        for (Map<String, Object> map : list) {
            Iterator<Entry<String, Object>> iterator = map.entrySet().iterator();
            while (iterator.hasNext()) {
                Entry<String, Object> next = iterator.next();
                // 返回对应的键 next.getValue(); 返回对应的值
                String key = next.getKey();
                map1.put(i, key);

                i++;
            }
        }

        // 循环得到的key,
        for (int j = 0; j < i; j++) {
            // 循环传入的list ,根据key判断
            for (Map<String, Object> map : list) {
                result(map, map1.get(j));
            }
        }

        return list;
    }

    /**
     * 传入map,和string字符串,判断map中有没有这个key-value 若没有,则添加 为 key-null
     *
     * @param map
     * @param str
     * @return
     */
    public static Map<String, Object> result(Map<String, Object> map, String str) {

        if (map.get(str) == null) {
            map.put(str, null);
        }
        return map;
    }

}
