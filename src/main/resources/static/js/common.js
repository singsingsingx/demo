var Url = "http://118.190.210.127";
//获取页面跳转传递的参数
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//种植cookie
function setCookie(c_name, value, expiredays) {　　　　
	var exdate = new Date();　　　　
	exdate.setDate(exdate.getDate() + expiredays);　　　　
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/");
}
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
function clearCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}
//input获取焦点,自填充内容小时
$("input").on("focus",function(){
	
	$(this).attr("placeholder","");
	$(this).css("text-align","left");
})
$(".nav-one-text-two").css("display","none");



