package com.toommi.demo.util;

public class AjaxResult {
    private Integer code; // 状态码
    private Object result; // 结果消息
    private Object message; // 返回结果

    public AjaxResult(Integer code, String msg) {
        this.code = code;
        this.message = msg;
        this.result = null;
    }

    /**
     * 操作成功
     */
    public AjaxResult(Object object) {
        this.code = 200;
        this.message = "操作成功";
        this.result = object;

    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "AjaxResult{" +
                "code=" + code +
                ", result=" + result +
                ", message=" + message +
                '}';
    }
}
