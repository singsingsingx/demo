;
(function($) {
	$.extend({
		inputStyle: function() {
			function check(el, cl) {
				$(el).each(function() {
					$(this).parent('i').removeClass(cl);

					var checked = $(this).prop('checked');
					if(checked) {
						$(this).parent('i').addClass(cl);
					}
				})
			}
			$('input[type="radio"]').on('click', function() {
				check('input[type="radio"]','radio_bg_check');
			})
			$('input[type="checkbox"]').on('click', function() {
				check('input[type="checkbox"]', 'checkbox_bg_check');
				check('input[type="radio"]', 'radio_bg_check');
				var type = []
				var moneyModel = {
					moneyModel: ""
				}
				$.each($(".items-wraper input"), function() {
					if(this.checked) {
						type.push($(this).attr("data-id"));
					}
				});
				moneyModel.moneyModel = type.join(",");
				$.ajax({
					type: "post",
					url: Url + "/WorldOfWarcraft/version1/other/selectPrice",
					data: moneyModel,
					dataType: 'json',
					success: function(res) {
						$("#acceptOrder").val(res.result.acceptOrder);

					}
				});
			})
		}

	})

})(jQuery)

//调用
$(function() {
	$.inputStyle();
})