var get_order_data = {
	pageSize: 1,
	rows: 2,
	moneyModel: null,
	gameName: null,
	serviceName: null,
	startTime: null,
	endTime: null
}

//获取订单列表
get_order();

function get_order() {
	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1/other/selectOrderList",
		dataType: 'json',
		data: get_order_data,
		success: function(res) {
			$(".content-table").empty();
			var result = res.result.list;
			var list = [];
			var otherName = [];
				for(var j = 0; j < result.length; j++) {
					for(var k = 0; k < result[j].moneyModel.length; k++) {
						otherName.push(result[j].moneyModel[k].otherName);

					}
					result[j].otherName = otherName.join(",");
					result[j].date = result[j].createTime.split(" ")[0];
					result[j].second = result[j].createTime.split(" ")[1].slice(0, 8);

				}

			var _list = {
				list: result
			}
			//初始化分页插件
			$(".pages").pagination({
				pageCount: Math.ceil(res.result.countList / 2),
				totalData: parseInt(res.result.countList),
				showData: 2,
				keepShowPN: true,
				prevContent: '上-页',
				nextContent: '下-页',
				callback: callBack
			});
			$.ajax({
				type: "get",
				url: "template/back-other-xm-assign.html",
				success: function(html) {
					var _html = Mustache.render($(html).find("#template-six").html(), _list);
					$(".content-table").append(_html)

				}
			});

		}
	})

}

//分页回调
function callBack(index) {
	get_order_data.pageSize = index.getCurrent();
	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1/other/selectOrderList",
		data: get_order_data,
		success: function(res) {
			$(".content-table").empty();
			index.getPageCount(Math.ceil(res.result.countList / 2));
			var result = res.result.list;
			var list = [];
			var otherName = [];
			for(var j = 0; j < result.length; j++) {
				for(var k = 0; k < result[j].moneyModel.length; k++) {
					otherName.push(result[j].moneyModel[k].otherName);

				}
				result[j].otherName = otherName.join(",");
				result[j].date = result[j].createTime.split(" ")[0];
				result[j].second = result[j].createTime.split(" ")[1].slice(0, 8);

			}
			var _list = {
				list: result
			}
			$.ajax({
				type: "get",
				url: "template/back-other-xm-assign.html",
				success: function(html) {
					var _html = Mustache.render($(html).find("#template-six").html(), _list);
					$(".content-table").append(_html)

				}
			});

		}
	});
}

//获取订单详情
var order_ID;
$(".content-table").on("click", ".assign-order", function() {
	$(".right-content-content-wraper").css("display", "block")
	var orderId = {
		orderId: $(this).attr("data-id")
	}
	order_ID = $(this).attr("data-id");
	$("#order-text").text($(this).attr("data-service") + '等级代练' + $(this).attr("data-date"))

	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1/other/selectOrderId",
		data: orderId,
		dataType: 'json',
		success: function(res) {
			$(".items-two").find(".left").remove();

			var _res = res;
			var moneyModel = {
				moneyModel: res.result.moneyModel
			}
			if(_res.result.orderStatus == 1) {
				if(_res.result.visual == 1) {
					_res.result.orderStatus = "未指派-未开始"

				} else {
					_res.result.orderStatus = "已指派-未开始"
				}

			} else if(_res.result.orderStatus == 2) {
				$("#accept-btn").attr("disabled", "disabled");
				$("#accept-btn").addClass("bg-gray");
				if(_res.result.visual == 1) {
					_res.result.orderStatus = "未指派-进行中"

				} else {
					_res.result.orderStatus = "已指派-进行中"

				}

			} else if(_res.result.orderStatus == 3) {
				$("#accept-btn").attr("disabled", "disabled");
				$("#accept-btn").addClass("bg-gray");
				if(_res.result.visual == 1) {
					_res.result.orderStatus = "未指派-已完成"

				} else {
					_res.result.orderStatus = "已指派-已完成"

				}

			}
			if(_res.result.saveType == 1) {
				_res.result.saveType = "无";
			} else {
				_res.result.saveType = "将军令";
			}
			$.ajax({
				type: "get",
				url: "template/back-other-xm-assign.html",
				success: function(res) {

					var template_one = $(res).find("#template-one").html();
					var template_two = $(res).find("#template-two").html();
					var template_three = $(res).find("#template-three").html();
					var template_four = $(res).find("#template-four").html();
					var template_five = $(res).find("#template-five").html();
					//代练项目
					var html_one = Mustache.render(template_one, moneyModel);
					//老板资料
					var html_two = Mustache.render(template_two, _res.result);
					//接单价格
					var html_three = Mustache.render(template_three, _res.result);
					//订单状态
					var html_four = Mustache.render(template_four, _res.result);
					//保密类型
					var html_five = Mustache.render(template_five, _res.result);
					$(".items-two").eq(0).append(html_one);
					$(".items-two").eq(1).append(html_two);
					$(".items-two").eq(4).append(html_three);
					$(".items-two").eq(5).append(html_four);
					$(".items-two").eq(2).append(html_five);
				}
			});
		}
	});
})

//获取用户列表
var get_user_list_data = {
	userType: "",
	name: ""
}
$("#short-user-name").on("blur", function() {
	$("#user-type").val() == "选择人员类型" ? alert("请选择人员类型") : get_user_list($("#user-type").val(), $("#short-user-name").val());

})

function get_user_list(userType, shortName) {
	get_user_list_data.userType = userType;
	get_user_list_data.name = shortName;
	$.ajax({
		type: "post",
		url: Url + ":8080/WOWweb/otherOrder/userList",
		data: get_user_list_data,
		success: function(res) {
			var result = res.result;
			$(".default option").remove();
			if(result.length > 10) {
				$(".user-list").css({
					"height": "360px",
					"overflow": "scroll"
				})
			} else {
				$(".user-list").css({
					"height": (result.length) * 36 + 'px',
				})
			}
			for(var i = 0; i < result.length; i++) {
				var html = "<option value=" + result[i].userPhone + ">" + result[i].userName + "</option>";
				$(".default").append(html);

			}

		}
	});
}

//指派订单
$("#assign-order-btn").on("click", function() {
	var assign_order_data = {
		userPhone: $("#short-user-name").val(),
		orderId: order_ID,
		userType: $("#user-type").val()
	}
	$.ajax({
		type: "post",
		url: Url + ":8080/WOWweb/otherOrder/updateOtehrtOrder",
		data: assign_order_data,
		success: function(res) {
			if(res.code == 200) {
				if(res.result != null) {
					alert("该用户名不存在！")
				} else if(res.result == null) {
					alert("订单指派成功！");
					location.reload();

				}

			}
		}
	});
})

//初始化日历插件
jeDate("#startTime", {
	format: "YYYY-MM-DD",
	isTime: false,
	theme: {
		bgcolor: "#828bff",
		color: "#ffffff",
		pnColor: "#828bff"
	}
});
jeDate("#endTime", {
	format: "YYYY-MM-DD",
	isTime: false,
	theme: {
		bgcolor: "#828bff",
		color: "#ffffff",
		pnColor: "#828bff"
	}
})

//获取项目列表
$.ajax({
	type: "post",
	url: Url + "/WorldOfWarcraft/version1/other/selectOtherList",
	dataType: 'json',
	success: function(res) {
		var result = res;
		$.ajax({
			type: "get",
			url: "template/back-other-xm-assign.html",
			success: function(res) {
				var result_html = res;
				var html = Mustache.render($(result_html).find("#template-seven").html(), result);
				$("#moneyModel").append(html);
			}
		});
	}
});

//筛选
$("#search-btn").on("click", function() {
	$("#moneyModel").val() == "选择项目" ? get_order_data.moneyModel = "" : get_order_data.moneyModel = $("#moneyModel").val();
	get_order_data.endTime = $("#endTime").val();
	get_order_data.startTime = $("#startTime").val();
	get_order();

})