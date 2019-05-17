var orderID = "";
//如果已经登录
var get_H = {
	carListType: "2"
}
//获取当天车次
$.ajax({
	type: "post",
	url: Url + "/WorldOfWarcraft/version1/dungeons/selectCarList",
	dataType: 'json',
	data: get_H,
	success: function(res) {
		var result = res.result;
		$("#car_num").empty();
		$("#car_num").append("<option>请选择车次</option>")

		for(var i = 0; i < result.length; i++) {
			var html = "<option value=" + result[i].orderId + ">第" + result[i].carListNum + "车次</option>";
			$("#car_num").append(html);
		}
	}
});

//$("#car_num").on("input", function() {
//	var get_H_detail = {
//		orderId: $(this).val()
//	}
//	$.ajax({
//		type: "post",
//		url: Url + "/WorldOfWarcraft/version1/dungeons/selectOrder",
//		data: get_H_detail,
//		dataType: 'json',
//		success: function(res) {
//			$(".left-item").empty();
//			$(".center-item").empty();
//			var result = res.result;
//			var person_table = result[0].personTableId;
//			for(var i = 0; i < person_table.length; i++) {
//
//				if(i >= 0 && i < 15) {
//
//					html_one = jugement(person_table[i].personName, person_table[i].pPageNum, person_table[i].personStatus, person_table[i].assistStatus, person_table[i].serviceUserId, person_table[i].personId, person_table[i].serviceName, person_table[i].personType);
//					$(".left-item ").append(html_one);
//
//				} else if(i >= 15) {
//					html_one = jugement(person_table[i].personName, person_table[i].pPageNum, person_table[i].personStatus, person_table[i].assistStatus, person_table[i].serviceUserId, person_table[i].personId, person_table[i].serviceName, person_table[i].personType);
//					$(".center-item").append(html_one);
//
//				}
//			}
//			$(".item").eq(0).removeClass("item-margin-top");
//			$(".item").eq(5).css("margin-top", "20px");
//			$(".item").eq(10).css("margin-top", "20px");
//			$(".item").eq(15).removeClass("item-margin-top");
//			$(".item").eq(20).css("margin-top", "20px");
//			$(".item").eq(25).css("margin-top", "20px")
//		}
//	});
//});
var get_H_detail = {
	orderId: ""
}

//获取车次详情
$("#car_num").on("input", function() {
	get_H_detail.orderId = $(this).val()
	get_car_detail(get_H_detail);

})

//获取车次详情函数
function get_car_detail(data) {
	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1/dungeons/selectOrder",
		data: data,
		dataType: 'json',
		success: function(res) {
			$(".left-item").empty();
			$(".center-item").empty();
			var result = res.result;
			var person_table = result[0].personTableId;
			$("#name-one").text("团长："+res.result[0].groupName);
			$("#group-code").text(res.result[0].groupCod);
			for(var i = 0; i < person_table.length; i++) {

				if(i >= 0 && i < 15) {

					html_one = jugement(person_table[i].personName, person_table[i].pPageNum, person_table[i].personStatus, person_table[i].assistStatus, person_table[i].serviceUserId, person_table[i].personId, person_table[i].serviceName, person_table[i].personType);
					console.log(html_one)
					$(".left-item ").append(html_one);

				} else if(i >= 15) {
					html_one = jugement(person_table[i].personName, person_table[i].pPageNum, person_table[i].personStatus, person_table[i].assistStatus, person_table[i].serviceUserId, person_table[i].personId, person_table[i].serviceName, person_table[i].personType);
					$(".center-item").append(html_one);

				}
			}
			$(".item").eq(0).removeClass("item-margin-top");
			$(".item").eq(5).css("margin-top", "20px");
			$(".item").eq(10).css("margin-top", "20px");
			$(".item").eq(15).removeClass("item-margin-top");
			$(".item").eq(20).css("margin-top", "20px");
			$(".item").eq(25).css("margin-top", "20px")
		}
	});
}

function jugement(personName, pPageNum, personStatus, assistStatus, serviceUserId, personid, serviceName, personType) {
	var html;
	if(personName == null) {
		if(personType == 4) {
			html = '<div class="item item-margin-top dgz">' +
				'<p>打工者</p>' +
//				'<div class="item-item" style="display: none;">' +
//				'<img src="img/bg.png" class="bg-img">' +
//				'<div class="item-item-top">' +
//				'<p style="text-align:left;color:#2c3849">打工者</p>' +
//				'<input type="text" />' +
//				'</div>' +
//				'<div class="item-item-bottom">' +
//				'<button style="width:100%;border-radius:5px">添加打工者</button>' +
//				'</div>' +
//				'<img src="img/close.png" class="item-item-close">' +
//				'</div>' +
				'</div>';
		} else if(personType == 1) {
			html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
				'</div>';
		}

	} else {
		//没有包拾取，自己上标的
		if(personType == 1) {
			if(pPageNum == 0) {
				if(personStatus == 1) {
					if(assistStatus == 1) {
						html = '<div class="item bg-yellow item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/genda-tijiaoxiezhu.png" class="pull-left">' +
							'<p class="pull-left item-name">跟随</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已协助</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							//							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<p class="pull-left help">协助</p>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 2) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title ">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-purper item-name-one">' + serviceName + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已占坑</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 3 || assistStatus == 5) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/kefuduan-pt-gensui-zijishangbiao.png" class="pull-left">' +
							'<p class="pull-left item-name">跟随</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已上标</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 4) {
						html = '<div class="item item-margin-top bg-gray" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/tangshi.png" class="pull-left">' +
							'<p class="pull-left item-name">跟随</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>进组失败</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					}
				} else if(personStatus == 2) {
					if(assistStatus == 1) {
						html = '<div class="item bg-yellow item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/kefuduan-pt-tangshi-zijishangbiao.png" class="pull-left">' +
							'<p class="pull-left item-name">躺尸</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已协助</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<p class="pull-left help">协助</p>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark">进组结果</button>' +

							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 2) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title ">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-purper item-name-one">' + serviceName + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已占坑</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 3 || assistStatus == 5) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/kefuduan-pt-tangshi-zijishangbiao.png" class="pull-left">' +
							'<p class="pull-left item-name">躺尸</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已上标</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							//							'<p class="pull-left help">协助</p>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 4) {
						html = '<div class="item item-margin-top bg-gray" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/genda.png" class="pull-left">' +
							'<p class="pull-left item-name">躺尸</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>进组失败</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							//							'<p class="pull-left help">协助</p>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					}

				} else if(personStatus == null) {
					html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
						'<p class="pull-left item-name-title ">' + personName + '</p>' +
						'<p class="pull-left line"></p>' +
						'<p class="pull-left item-name item-name-purper item-name-one">' + serviceName + '</p>' +
						'<div class="item-msg">' +
						'<img src="img/kefuduan-pt-zhushidiban.png">' +
						'<p>已占坑</p>' +
						'</div>' +
						'<div class="item-item">' +
//						'<img src="img/bg.png" class="bg-img">' +
						'<div class="item-item-top">' +
						'<p>与欧式老板几月</p>' +
						'<p>组人客服：周小二</p>' +
						'</div>' +
						'<div class="item-item-bottom">' +
						'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
						//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
						//							'<p class="pull-left no-border-right clear">清空</p>' +
						'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
						'</div>' +
						'<img src="img/close.png" class="item-item-close">' +
						'</div>' +
						'</div>';

				}

			} else {

				if(personStatus == 1) {
					if(assistStatus == 1) {
						html = '<div class="item bg-yellow item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/genda-tijiaoxiezhu.png" class="pull-left">' +
							'<p class="pull-left item-name">跟随</p>' +
							'<img src="img/baoshiqu-yitijiaoxiezhu.png" class="pull-left">' +
							'<p class="pull-left item-name">' + pPageNum + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已协助</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<p class="pull-left help">协助</p>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark">进组结果</button>' +

							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 2) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title ">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-purper item-name-one">' + serviceName + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已占坑</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 3 || assistStatus == 5) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/kefuduan-pt-gensui-zijishangbiao.png" class="pull-left">' +
							'<p class="pull-left item-name">跟随</p>' +
							'<img src="img/kefuduan-pt-shiqu-ziji.png" class="pull-left">' +
							'<p class="pull-left item-name">' + pPageNum + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已上标</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 4) {
						html = '<div class="item item-margin-top bg-gray" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/tangshi.png" class="pull-left">' +
							'<p class="pull-left item-name">跟随</p>' +
							'<img src="img/55.png" class="pull-left">' +
							'<p class="pull-left item-name">' + pPageNum + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>进组失败</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					}
				} else if(personStatus == 2) {
					if(assistStatus == 1) {
						html = '<div class="item bg-yellow item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/tangshi-yitijiaoxiezhu.png" class="pull-left">' +
							'<p class="pull-left item-name">躺尸</p>' +
							'<img src="img/baoshiqu-yitijiaoxiezhu.png" class="pull-left">' +
							'<p class="pull-left item-name">' + pPageNum + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已协助</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<p class="pull-left help">协助</p>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 2) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title ">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-purper item-name-one">' + serviceName + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已占坑</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 3 || assistStatus == 5) {
						html = '<div class="item item-margin-top" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/kefuduan-pt-tangshi-zijishangbiao.png" class="pull-left">' +
							'<p class="pull-left item-name">躺尸</p>' +
							'<img src="img/kefuduan-pt-shiqu-ziji.png" class="pull-left">' +
							'<p class="pull-left item-name">' + pPageNum + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>已上标</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					} else if(assistStatus == 4) {
						html = '<div class="item item-margin-top bg-gray" data-id=' + personid + ' data-serviceId=' + serviceName + '>' +
							'<p class="pull-left item-name-title">' + personName + '</p>' +
							'<p class="pull-left line line-white"></p>' +
							'<p class="pull-left item-name item-name-one">' + serviceName + '</p>' +
							'<img src="img/genda.png" class="pull-left">' +
							'<p class="pull-left item-name">躺尸</p>' +
							'<img src="img/55.png" class="pull-left">' +
							'<p class="pull-left item-name">' + pPageNum + '</p>' +
							'<div class="item-msg">' +
							'<img src="img/kefuduan-pt-zhushidiban.png">' +
							'<p>进组失败</p>' +
							'</div>' +
							'<div class="item-item">' +
//							'<img src="img/bg.png" class="bg-img">' +
							'<div class="item-item-top">' +
							'<p>与欧式老板几月</p>' +
							'<p>组人客服：周小二</p>' +
							'</div>' +
							'<div class="item-item-bottom">' +
							'<button class="pull-left help" disabled="disabled" style="background:#fff;color:#9A9A9A;border:none;border-right:1px solid #dcdcdc">协助</button>' +
							//							'<p class="pull-left" style="color: #9A9A9A;">占坑</p>' +
							//							'<p class="pull-left no-border-right clear">清空</p>' +
							'<button class="make-mark" style="background:#fff;color:#9A9A9A;border:none;">进组结果</button>' +
							'</div>' +
							'<img src="img/close.png" class="item-item-close">' +
							'</div>' +
							'</div>';
					}

				}

			}

		} else if(personType == 4) {
		html = '<div class="item item-margin-top dgz" data-name=' + personName + '>' +
				'<p>打工者：' + personName + '</p>' +
				'<div class="item-item" style="display: none;">' +
//				'<img src="img/bg.png" class="bg-img">' +
				'<div class="item-item-top">' +
				'<p>打工者</p>' +
				'<input type="text" value='+ personName+' class="worker-name-one">' +
				'</div>' +
				'<div class="item-item-bottom">' +
				'<button style="width:100%;border-radius:5px" id="change-worker-btn" data-id='+personid+'>更改打工者</button>' +
				'</div>' +
				'<img src="img/close.png" class="item-item-close">' +
				'</div>' +
				'</div>'
		}

	}

	//	}
	return html;
}
$(".right-content").on("click", ".item", function() {
	$(".item").removeClass("item-active");
	$(this).find(".item-item-top").find("p").eq(1).css("color", "#666666");
	$(this).find(".item-item-top").find("p").eq(1).css("font-size", "16px");
	$(this).addClass("item-active");
	$(".item").find(".item-item").css("display", "none");
	$(this).find(".item-item").css("display", "block");
	$(this).find(".item-item-top").find("p").eq(0).text($(this).find(".item-name").eq(0).text());
	$(this).find(".help").attr("data-name", $(this).find(".item-name").eq(0).text());
	$("#copy").val($(this).find(".item-name").eq(0).text());
	if($(this).attr("data-serviceid") == "null") {
		$(this).find(".item-item-top").find("p").eq(1).text("");
	} else {
		$(this).find(".item-item-top").find("p").eq(1).text("组人客服：" + $(this).attr("data-serviceid"));

	}

	$(this).find(".item-item-bottom").find(".make-mark").attr("data-personid", $(this).attr("data-id"));
	$(this).find(".item-item-bottom").find("p").eq(2).attr("data-personid", $(this).attr("data-id"));
	$(this).find(".help").attr("data-personid", $(this).attr("data-id"));
	$("#copy").val($(this).find(".item-name").eq(0).text());

})

//点击关闭弹窗
$(".right-content").on("click", ".item-item-close", function(e) {
	$(this).parent().css("display", "none");
	$(".join_in_result_btn").attr("disabled", "disabled");
	$(".join_in_result_btn").addClass("btn-gray")
	e.stopPropagation();

})
$(".right-content").on("click", ".dgz", function() {
	$(".item").find(".item-item").css("display", "none");

	$(this).find(".item-item").css("display", "block");
	$(this).find(".item-item-top").find("p").eq(0).text("打工者");
	$(this).find(".item-item-top").find("input").eq(1).text($(this).attr("data-name"));
	$(this).find(".item-item-bottom").find(".make-mark").attr("data-personid", $(this).attr("data-id"));
	//	$(this).find(".item-item-bottom").find("p").eq(2).attr("data-personid", $(this).attr("data-id"));
	//	$(this).find(".help").attr("data-personid", $(this).attr("data-id"));

})

//协助进组反馈
$(".join_in_result_btn").on("click", function() {
	var personID = $(".item-active").attr("data-id");
	var join_in_result_data = {
		personId: personID,
		personStutus: 1,
		personAssist: ""
	}
	var result = $('input:radio[name="result"]:checked').val();
	join_in_result_data.personAssist = result;
	$.ajax({
		type: "post",
		url: Url + "/WorldOfWarcraft/version1/dungeons/assistResult",
		data: join_in_result_data,
		dataType: 'json',
		success: function(res) {
			alert(res.msg);
			$(".join_in_result_btn").attr("disabled","disabled");
			$(".join_in_result_btn").addClass("btn-gray");
			$(".join_in_result_btn").attr("cursor","not-allowed")
			get_car_detail(get_H_detail);
		}
	});
})
$(".right-content").on("click", ".make-mark", function() {
	$(".join_in_result_btn").removeClass("btn-gray");
	$(".join_in_result_btn").removeAttr("disabled");
	$(".join_in_result_btn").css("cursor","pointer");
})

//协助
$(".right-content").on("click", ".help", function() {
	copyText()
})

//添加打工者
$(".add-worker-btn").on("click", function() {
	var worker_name = {
		workersName: $(".worker-name").val(),
		orderId: $("#car_num").val()
	}
	if(worker_name.workersName != "") {
		$.ajax({
			type: "post",
			url: Url + "/WorldOfWarcraft/version1/dungeons/addNameWorker",
			data: worker_name,
			dataType: "json",
			success: function(res) {
				alert(res.msg);
				$(".worker-name").val("")
				get_car_detail(get_H_detail);

			}
		});
	} else {
		alert("请填写打工者全名！")
	}
});


var change_worker_data = {
	workersName:"",
	personId:"",
	orderId:$("#car_num").val()
}
$(".left-item,.center-item").on("click","#change-worker-btn",function(){
	change_worker_data.workersName = $(".worker-name-one").val();
	change_worker_data.personId = $(this).attr("data-id");
	$.ajax({
		type:"post",
		url:Url+"/WorldOfWarcraft/version1/dungeons/updateWorker",
		data:change_worker_data,
		dataType:'json',
		success:function(res){
			alert("修改打工者信息成功！");
			get_car_detail(get_H_detail);
		}
	});
})


var lockReconnect = false; //避免重复连接
var wsUrl = "ws://118.190.210.127/WorldOfWarcraft/websocket/socketServer.do?userPhone=" + getCookie("userPhone");
var ws;
var tt;
//创建websocket连接
createWebSocket();

function createWebSocket() {
	try {
		ws = new WebSocket(wsUrl);
		init();
	} catch(e) {
		reconnect(wsUrl);
	}
}

function init() {
	ws.onclose = function() {
		reconnect(wsUrl);
	};
	ws.onerror = function() {
		reconnect(wsUrl);
	};
	ws.onopen = function() {
		heartCheck.start();
	};
	ws.onmessage = function(e) {
		console.log(e);
		if(JSON.parse(e.data)[0].code == 810) {
			$("#msg").append('<p class="msg">' + JSON.parse(e.data)[0].msg + '</p>');
			get_info();
		} else if(JSON.parse(e.data)[0].code == 802) {
			console.log(1)
			var html = '<div class="item-one-two-item">' +
				'<p class="pull-left">' + JSON.parse(e.data)[0].msg + '</p>' +
				'<button type="button" class="pull-right">同意</button>' +
				'</div>'
			$(".employ-wraper").append(html);
		} else if(JSON.parse(e.data)[0].code != 800) {
			get_info();
		}

		heartCheck.start();
	}
}

//重新连接函数
function reconnect(url) {
	if(lockReconnect) {
		return;
	};
	lockReconnect = true;
	//没连接上会一直重连，设置延迟避免请求过多
	tt && clearTimeout(tt);
	tt = setTimeout(function() {
		createWebSocket(url);
		lockReconnect = false;
	}, 4000);
}

//心跳检测
var heartCheck = {
	timeout: 3000,
	timeoutObj: null,
	serverTimeoutObj: null,
	start: function() {
		var self = this;
		this.timeoutObj && clearTimeout(this.timeoutObj);
		this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			ws.send("123456789");
			self.serverTimeoutObj = setTimeout(function() {
				ws.close();
			}, self.timeout);

		}, this.timeout)
	}
}
