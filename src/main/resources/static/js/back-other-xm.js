//获取userPhone和userName
var userPhone = GetRequest().userPhone;
var get_service_area_data = {
	serviceId: ""
}
//创建订单
var add_order = {
	token: "557b66c977a8403791b575fa9c95d1d5",
	userPhone: getCookie("userPhone"),
	serviceArea: "",
	servierN: "",
	profession: "",
	campFaction: "",
	gameUserId: "",
	gamePwd: "",
	gameChildUserId: "",
	gameName: "",
	talentAndGrade: "",
	artifactAndGrade: "",
	orderStatus: "",
	orderMoney: "",
	acceptOrder: "",
	orderDay: "",
	orderTime: "",
	moneyModel: "",
	saveType: ""
}

//获取项目列表
$.ajax({
	type: "post",
	url: Url + "/WorldOfWarcraft/version1/other/selectOtherList",
	dataType: 'json',
	success: function(res) {
		var result = res;
		$(".items-wraper").empty();
		$.ajax({
			type: "get",
			url: "template/other-template.html",
			success: function(res) {
				var result_html = res;
				var html = Mustache.render($(result_html).find("#template-one").html(), result);
				$(".items-wraper").append(html);
				$.inputStyle();
			}
		});
	}
});

//提交订单
$("#submit-btn").on("click", function() {
	var type = [];
	var input = $(".items-wraper input");
	$.each($(".items-wraper input"), function() {
		if(this.checked) {
			type.push($(this).attr("data-id"));
		}
	});
	add_order.moneyModel = type.join(",");
	add_order.serviceArea = $("#serviceArea").val();
	add_order.servierN = $("#servierN").val();
	add_order.profession = $("#profession").val();
	add_order.campFaction = $("#campFaction").val();
	add_order.gameUserId = $("#gameUserId").val();
	add_order.gamePwd = $("#gamePwd").val();
	add_order.gameChildUserId = $("#gameChildUserId").val();
	add_order.gameName = $("#gameName").val();
	add_order.talentAndGrade = $("#talentAndGrade").val();
	add_order.artifactAndGrade = $("#artifactAndGrade").val();
	add_order.acceptOrder = $("#acceptOrder").val();
	add_order.orderDay = $("#orderDay").val();
	add_order.orderTime = $("#orderTime").val();
	var save_type = $('input[name="save-type"]:checked').val();
	save_type ? add_order.saveType = save_type : add_order.saveType = 1;
	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1/other/addOtherorder",
		data: add_order,
		dataType: 'json',
		success: function(res) {
			if(res.code == 200) {
				alert("添加订单成功！");
				location.reload();
			}
		}
	});

})

//识别文字内容
$(".left-item-content").on("focus", function() {
	$(this).find("p").remove();
})
var order_detail;
$(".left-item-content").on("blur", function() {
	
	order_detail = $(this).text().split(",");
	var team = order_detail[10].split(";");
	var keep_type = order_detail[11];
	order_detail.splice(10, 2);
	var common = $(".right-item").find(".common");
	for(var i = 0; i < order_detail.length; i++) {
		common.eq(i).val(order_detail[i].trim());
	}
	var name;
	$.each($(".items"), function() {
		name = $(this).find("p").text();
		var _$this = $(this);
		for(var i = 0; i < team.length; i++) {
			if(name == team[i]) {
				_$this.find("i").find("input").attr("checked", "checked");
				_$this.find("i").addClass("checkbox_bg_check")
			}
		}
	});

	if(keep_type == "无") {
		$(".items-three").eq(0).find("i").addClass("radio_bg_check")
	} else if(keep_type == "将军令") {
		$(".items-three").eq(1).find("i").addClass("radio_bg_check")
	}
	get_service_list();
})
get_service_list();

//获取服务器列表
function get_service_list() {
	$.ajax({
		type: 'post',
		url: Url + "/WorldOfWarcraft/version1//dungeons/selectService",
		dataType: 'json',
		success: function(res) {
			$.ajax({
				type: "get",
				url: "template/other-template.html",
				success: function(html) {
					$("#servierN").empty();
					var html = Mustache.render($(html).find("#template-two").html(), res);
					$("#servierN").append(html);
					$.each($("#servierN option"), function() {
						if(order_detail.length > 0) {
							if($(this).text() == order_detail[0]) {
								$(this).attr("selected", "selected");
								get_service_area_data.serviceId = $(this).val();
								get_service_area()

							}
						}

					});
					get_service_area_data.serviceId = $("#servierN").val();
					get_service_area();
				}
			});

		}
	})
}

//获取服务区列表
function get_service_area() {
	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1//dungeons/selectServiceTwo",
		data: get_service_area_data,
		dataType: 'json',
		success: function(res) {
			$.ajax({
				type: "get",
				url: "template/other-template.html",
				success: function(html) {
					$("#serviceArea").empty();
					var _html = Mustache.render($(html).find("#template-three").html(), res);
					$("#serviceArea").append(_html);
					$.each($("#serviceArea option"), function() {
						if(order_detail.length > 0) {
							if($(this).text() == order_detail[1]) {
								$(this).attr("selected", "selected");

							}
						}

					});
				}
			});
		}
	});

}

$("#servierN").on("input", function() {
	get_service_area_data.serviceId = $("#servierN").val();
	get_service_area();
})