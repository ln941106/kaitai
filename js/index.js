//百度统计
var  _hmt  =  _hmt  ||  [];
(function()  {
    var  hm  =  document.createElement("script");
    hm.src  =  "https://hm.baidu.com/hm.js?45b51bd5658f81b5c708d82b9aef4737";
    var  s  =  document.getElementsByTagName("script")[0];  
    s.parentNode.insertBefore(hm,  s);
})();


// // 切换显示预约弹框
var fadeInbox = function(){
	$('.about_decorate').fadeIn(200)
}
// // 点击确定隐藏提示信息
var displayNone = function(){
	$('.about_decorate_prompt').css({
		display: 'none'
	});
}
// // 点击确定显示隐藏提示信息
var displayBlock = function(){
	$('.about_decorate_prompt').css({
		display: 'block'
	});
}


// 计算价格
$('.aside_header').click(function() {
	$('.aside_section').slideToggle("slow");
	HouseType(); //获取面积
	OpenCity(); //获取城市
})
/* 预约装修 */
// 显示
$('.service_process ul li').click(function() {
	fadeInbox();
	OpenCity(); //获取城市
})
// 隐藏
$('.about_show').click(function() {
	$('.about_decorate').fadeOut(200)
})
// 立即预约
$('.nav_appointment').click(function() {
	fadeInbox();
	OpenCity(); //获取城市
})
// 装修预约
$('.footer_body_left button').click(function() {
	fadeInbox();
	OpenCity(); //获取城市
})

// 装修产品页面  
// 我要装修
$('.want_decorate').click(function() {
	fadeInbox()
})
// 隐藏 好友推荐
$('.about_show').click(function() {
	$('.recommend_friends').fadeOut(200)
})


// 滚动页面导航
$(document).scroll(function() {
	var scroH = $(document).scrollTop(); //滚动高度
	if (scroH > 600) { //距离顶部大于100px时
		$('.return_head').css({
			opacity: 1
		})
	} else {
		$('.return_head').css({
			opacity: 0
		});
	}
});

//点击导航
// $('.headerpage .navigation_box>li').click(function() {
// 	alert(54786)
// 	$('.headerpage>li').removeClass('active');
// 	$(this).addClass('active');
// })

//立即预约 弹窗
$('.sendForm').click(function () {
	displayBlock();
	var flag = false; //提示信息
	var message = '';
	var myreg = /^1[34578]\d{9}$/;
	var city_id = $('.select').val();
	var telephone = $('.about_decorate .telephone').val();
	if (telephone == '') {
		message = "手机号码不能为空！";
		$('.telephone').val("");
	} else if (telephone.length != 11) {
		message = "请输入有效的手机号码！";
		$('.telephone').val("");
	} else if (!myreg.test(telephone)) {
		message = "请输入有效的手机号码！";
		$('.telephone').val("");
	} else {
		flag = true;
		$.ajax({
			type: 'POST',
			url: 'http://www.detaihome.com/website/HouseType',
			data: {
				telephone: telephone,
				city_id: city_id
			},
			dataType: 'json',
			success: function(data) {
				if (data.error == 'ok') {
					$('.telephone').val("");
				}
			}
		});
	}
	if (!flag) {
		//提示错误效果
		var div = $('<div class="about_decorate_prompt"><div class="error">x</div><div>' + message +
			'</div><button>确定</button></div>');
		$('.about_decorate').append(div);
	} else {
		//提示正确效果
		var div = $(
			'<div class="about_decorate_prompt"><div class="sucs">✔</div><div class="successful">信息提交成功，客服人员24小时内和您联系。</div><button>确定</button></div>'
		);
		$('.about_decorate').append(div);
	}
	// 点击确定隐藏提示信息
	if (flag == true) {
		//显示
		displayBlock();
		$('.about_decorate .about_decorate_prompt button').click(function() {
			$('.about_decorate').css({
				display: 'none'
			})
			// 隐藏
			displayNone();
		})
	} else {
		//显示
		displayBlock();
		$('.about_decorate .about_decorate_prompt button').click(function() {
			// 隐藏
			displayNone();
		})
	}
})

//推荐好友 弹窗
$('.recommend_submit').click(function () {
	// 隐藏
	displayNone();
	var flag = false; //提示信息
	var message = '';
	var myreg = /^1[34578]\d{9}$/;
	var username = $('.username').val(); //推荐人姓名
	var user_telephone = $('.user_telephone').val(); //推荐人电话
	var referrer_name = $('.referrer_name').val(); //本人姓名
	var referrer_telephone = $('.referrer_telephone').val(); //本人电话
	var city_id = $('.about_body .select').val(); //城市
	
	if (username == '' || user_telephone == '' || referrer_name == '' || referrer_telephone == '' || city_id == '') {
		message = "姓名手机号不能为空！";
	} else if (user_telephone.length != 11 || referrer_telephone.length != 11) {
		message = "请输入有效的手机号码！";
	} else if (!myreg.test(user_telephone) || !myreg.test(referrer_telephone)) {
		message = "请输入有效的手机号码！";
	} else {
		flag = true;
		$.ajax({
			type: 'POST',
			url: 'http://www.detaihome.com/website/ReferrerInfo',
			data: {
				username:username,
				user_telephone:user_telephone,
				referrer_name:referrer_name,
				referrer_telephone:referrer_telephone,
				city_id:city_id
			},
			dataType: 'json',
			success: function(data) {
				console.log(data)
				if (data.error == 'ok') {
					$('.username').val(''); //推荐人姓名
					$('.user_telephone').val(''); //推荐人电话
					$('.referrer_name').val(''); //本人姓名
					$('.referrer_telephone').val(''); //本人电话
				}
			}
		});
	}
	if (!flag) {
		//提示错误效果
		var div = $('<div class="about_decorate_prompt"><div class="error">x</div><div>' + message +
			'</div><button>确定</button></div>');
		$('.recommend_friends').append(div);
	} else {
		//提示正确效果
		var div = $(
			'<div class="about_decorate_prompt"><div class="sucs">✔</div><div class="successful">信息提交成功，客服人员24小时内和您联系。</div><button>确定</button></div>'
		);
		$('.recommend_friends').append(div);
	}
	// 点击确定隐藏提示信息
	if (flag == true) {
		//显示
		displayBlock();
		$('.recommend_friends .about_decorate_prompt button').click(function() {
			$('.recommend_friends').css({
				display: 'none'
			})
			// 隐藏
			displayNone();
		})
	} else {
		//显示
		displayBlock();
		$('.recommend_friends .about_decorate_prompt button').click(function() {
			// 隐藏
			displayNone();
		})
	}
})


// 获取面积
function HouseType() {
	$.ajax({
		type: 'GET',
		url: 'http://www.detaihome.com/website/HouseType',
		dataType: 'json',
		success: function(data) {
			// 室
			var room = data.room;
			for (var i = 0; i < room.length; i++) {
				var option = $("<option>");
				option.attr('value', room[i]);
				option.html(room[i] + '室');
				$(".room").append(option);
			}
			// 厅
			var hall = data.hall;
			for (var i = 0; i < hall.length; i++) {
				var option = $("<option>");
				option.attr('value', hall[i]);
				option.html(hall[i] + '厅');
				$(".hall").append(option);
			}
			// 厨房
			var kitchen = data.kitchen;
			for (var i = 0; i < kitchen.length; i++) {
				var option = $("<option>");
				option.attr('value', kitchen[i]);
				option.html(kitchen[i] + '厨房');
				$(".kitchen").append(option);
			}
			// 阳台
			var balcony = data.balcony;
			for (var i = 0; i < balcony.length; i++) {
				var option = $("<option>");
				option.attr('value', balcony[i]);
				option.html(balcony[i] + '阳台');
				$(".balcony").append(option);
			}
			// 卫生间
			var toilet = data.toilet;
			for (var i = 0; i < toilet.length; i++) {
				var option = $("<option>");
				option.attr('value', toilet[i]);
				option.html(toilet[i] + '卫生间');
				$(".toilet").append(option);
			}
		}
	})
}

// 获取城市
function OpenCity() {
	$.ajax({
		type: 'GET',
		url: 'http://www.detaihome.com/website/OpenCity',
		dataType: "json",
		success: function(data) {
			var city_list = data.city_list;
			for (var i = 0; i < city_list.length; i++) {
				var option = $("<option>");
				option.attr('value', city_list[i].id);
				option.html(city_list[i].city_name);
				//城市
				$("#form .select").append(option); //弹窗城市
				$(".appointment_body .select").append(option); //案例故事
				$(".aside_aside .select").append(option); //底部城市
			}
		}
	});
}

// 成功数据
function AppointmentInfo() {
	var liHeiight = 0;  // 元素的高度 跑马灯
	//获取预约成功数据
	$.ajax({
		type: 'GET',
		url: 'http://www.detaihome.com/website/AppointmentInfo',
		dataType: 'json',
		success: function(data) {
			var success_appointment = data.success_appointment;
			for (var i = 0; i < success_appointment.length; i++) {
				var li = $("<li>");
				li.html(success_appointment[i]);
				$(".gundong ul").append(li);
			}
			$(".gundong ul li:eq(0)").addClass('active');
			liHeiight = $('.gundong li').height(); // 元素的高度 跑马灯
		}
	})
}
// 预约装修 页面加载显示
$(function() {
	//获取面积
	// HouseType();
	// 获取城市
	OpenCity();
	var liHeiight = 0;  // 元素的高度 跑马灯
	//获取预约成功数据
	$.ajax({
		type: 'GET',
		url: 'http://www.detaihome.com/website/AppointmentInfo',
		dataType: 'json',
		success: function(data) {
			var success_appointment = data.success_appointment;
			for (var i = 0; i < success_appointment.length; i++) {
				var li = $("<li>");
				li.html(success_appointment[i]);
				$(".gundong ul").append(li);
			}
			$(".gundong ul li:eq(0)").addClass('active');
			liHeiight = $('.gundong li').height(); // 元素的高度 跑马灯
		}
	})
	//首页导航
	$(".headerpage").load("header.html",function(){
		var links = $(".headerpage .navigation_box>li>a");
		index = 0; //默认第一个菜单项
		//取当前URL最后一个/后面的文件名，pop方法是删除最后一个元素并返回最后一个元素
		url = location.href.split("?")[0].split("/").pop();
		if(url){//如果有取到，则进行匹配，否则默认首页（即index所指向的那个）
			for(var i=0;i<links.length;i++){//遍历menu中的链接地址
				if(links[i].href.indexOf(url) != -1){
					index = i;
					break;
				}
			}
		}
		$(".headerpage .navigation_box>li").eq(index).addClass("active");//给对应的<li>增加选中样式
		// 案例故事 查看更多 case_type默认1 装修案例
		$('.Case_story>a').click(function () {
			sessionStorage.setItem("case_type", 1);
		})
		//案例故事请求case_type
		$('.Case_story ul li').click(function () {
			sessionStorage.setItem("case_type", $(this).data('case_type'));
		})
	});
	//工装装修导航
	$(".tooling_headerpage").load("tooling_header.html");
	//上门维修导航
	$(".products_headerpage").load("products_header.html");
	//家庭装修导航
	$(".family_header").load("family_header.html");
	
	//关注我们
	$(".follow_us").load("attention.html",function () {
		$('.attention_wm div').click(function () {
			// 隐藏二维码
			$('.attention_wm').hide()
		})
	});
	$(".follow_box").load("../attention.html",function () {
		$('.attention_wm div').click(function () {
			// 隐藏二维码
			$('.attention_wm').hide();
		})
	});
	
	//获取微信公众号文章链接
	$.ajax({
		type: 'GET',
		url: 'http://www.detaihome.com/website/WechatArticle',
		dataType: 'json',
		success: function(data) {
			var article_list = data.article_list;
			for (var i = 0; i < article_list.length; i++) {
				var alist = $('<a class="the_item" target="__blanka" rel="nofollow" href="' + article_list[i].article_url +
					'"><div class="the_top"><img src="http://www.detaihome.com' + article_list[i].background_image +
					'" alt="微信"><div></div></div><div class="the_bot"><img src="http://www.detaihome.com' + article_list[i].writer_photo +
					'" alt="头像"><div>' + article_list[i].writer + '</div><div class="title">' + article_list[i].title +
					'</div><div class="the_reading"><div class="">微信阅读量</div><div class="">' + article_list[i].pviews +
					'</div></div></div></a>')
				$(".the_body").append(alist);
			}

		}
	})

	//获取首页装修案例
	$.ajax({
		type: 'GET',
		url: 'http://www.detaihome.com/website/InteriorFinishCase?home_page=1',
		dataType: 'json',
		success: function(data) {
			var case_list = data.case_list;
			// console.log(case_list)
			for (var i = 0; i < case_list.length; i++) {
				var num = i + 1;
				if (case_list[i].hard_outfit == null) {
					if (num % 2 == 1) {
						case_singular(case_list[i],num);	
					} else {
						case_both(case_list[i],num);
					}
				}else{
					if (num % 2 == 1) {
						fitment_singular(case_list[i],num);	
					} else {
						fitment_both(case_list[i],num);
					}
				}
			}
			var list = $('.real_top');
			for(var i = 0; i < list.length; i++){  
				list[i].onclick = function (){  
					sessionStorage.setItem("article_id", $(this).attr('article_id'));
				};
			} 
			//页面跳转 案例详情文章获取
			particulars();
		}
	})
	

	//获取装修案例界面 服务案例
	$('.Case_story ul li').click(function () {
		sessionStorage.setItem("case_type", $(this).data('case_type'));
	})
	// 案例故事 查看更多 默认
	$('.Case_story>a').click(function () {
		sessionStorage.setItem("case_type", 1);
	})
	var article_id = 0;
	// 案例详情文章获取
	if (sessionStorage.getItem('case_type')) {
		$.ajax({
			type: 'GET',
			url: 'http://www.detaihome.com/website/InteriorFinishCase?home_page=0',
			dataType: 'json',
			data: {
				case_type:sessionStorage.getItem('case_type')
			},
			success: function(data) {
				var case_list = data.case_list;
				for (var i = 0; i < case_list.length; i++) {
					if (case_list[i].hard_outfit == null) {
						//无硬装
						finish_both(case_list[i])
					} else{
						//有硬装
						finish_singular(case_list[i])
					}
					
		
					// 案例故事 预约咨询
					$('.the_article_body div div button').click(function() {
						$('.about_decorate').fadeIn(200)
					});
				}
				//页数
				$('.the_next .pager span').text(data.page_sum)
				for(var i = 1; i <= data.page_sum; i++){  
					var li = $('<li class="hver active page"><a>'+i+'</a></li>');
					$('.previous_page').after(li)
				} 
				//页数小于1禁止点击
				if($('.page').length == 1){
					$('.Number_page').addClass('disabled')
				}
				 //页面跳转 案例详情文章获取
				particulars();
			}
		});
		
	}else{
		$.ajax({
			type: 'GET',
			url: 'http://www.detaihome.com/website/InteriorFinishCase?home_page=0',
			dataType: 'json',
			success: function(data) {
				var case_list = data.case_list;
				for (var i = 0; i < case_list.length; i++) {
					if (case_list[i].hard_outfit == null) {
						//无硬装
						finish_both(case_list[i])
					} else{
						//有硬装
						finish_singular(case_list[i])
					}
					// 案例故事 预约咨询
					$('.the_article_body div div button').click(function() {
						$('.about_decorate').fadeIn(200)
					});
				}
				//页数
				$('.the_next .pager span').text(data.page_sum)
				for(var i = 1; i <= data.page_sum; i++){  
					var li = $('<li class="hver active page"><a>'+i+'</a></li>');
					$('.previous_page').after(li)
				} 
				//页数小于1禁止点击
				if($('.page').length == 1){
					$('.Number_page').addClass('disabled')
				}
				
				//页面跳转 案例详情文章获取
				particulars();
			}
		});
	}

	//底部预约计算
	$(".aside").load("aside.html",function(){
		//获取城市
		OpenCity();
		AppointmentInfo();
		// 计算价格
		$('.aside_header').click(function() {
			$('.aside_section').slideToggle("slow");
			// 获取面积
			HouseType();
			//获取城市
			OpenCity();
		})
		//适配
		//跑马灯
		// var liHeiight = $('.gundong li').height();
		// var liHeiight = 25;
		var num = $(".gundong li").length;
		if (num < num+1) {
			$('.gundong').css({
				'height': liHeiight * (num - 1)
			});
		};
		function gundong(val) {
			var clone = $('.gundong li').first().clone();
			$('.gundong ul').append(clone);
			$('.gundong li').removeClass('active');
			$('.gundong ul').stop().animate({
				top: -liHeiight
			}, 800, function() {
				$('.gundong ul').css({
					top: 0
				});
				$('.gundong li').eq(0).remove();
				$('.gundong li').eq(0).addClass('active');
			})
		};
		var t = setInterval(function() {
			gundong();
		}, 1500);
		
		//获取面积 信息提示
		$('.immediately').click(function() {
			var room = $('.room').val(); //室
			var hall = $('.hall').val(); //厅
			var kitchen = $('.kitchen').val(); //厨房
			var balcony = $('.balcony').val(); //阳台
			var toilet = $('.toilet').val(); //卫生间
			var city = $('.select').val(); //城市
			var area = $('.area').val(); //面积
			var phone = $('.phone').val(); //手机号
		
			// 隐藏
			displayNone();
			var flag = false; //提示信息
			var message = '';
			var myreg = /^1[34578]\d{9}$/;
			if (phone == '' || area == '') {
				message = "手机号或者面积不能为空！";
			} else if (phone.length != 11) {
				message = "请输入有效的手机或者面积！";
			} else if (!myreg.test(phone)) {
				message = "请输入有效的手机号码！";
			} else {
				flag = true;
				$.ajax({
					type: 'POST',
					url: 'http://www.detaihome.com/website/HouseType',
					data: {
						floor_space: area,
						city_id: city,
						telephone: phone,
						room: room,
						hall: hall,
						kitchen: kitchen,
						balcony: balcony,
						toilet: toilet
					},
					dataType: 'json',
					success: function(data) {
						if (data.error == 'ok') {
							$('.telephone').val("");
						}
					}
				});
			}
			if (!flag) {
				//提示错误效果
				var div = $('<div class="about_decorate_prompt"><div class="error">x</div><div>' + message +
					'</div><button>确定</button></div>');
				$('.aside_section').append(div);
			} else {
				//提示正确效果
				var div = $(
					'<div class="about_decorate_prompt"><div class="sucs">✔</div><div class="successful">信息提交成功，客服人员24小时内和您联系。</div><button>确定</button></div>'
				);
				$('.aside_section').append(div);
			}
			// 点击确定隐藏提示信息
			if (flag == true) {
				$('.aside_section .back').css({
					display: 'block'
				});
				//显示
				displayBlock();
		
				$('.aside_section button').click(function() {
					$('.about_decorate').css({
						display: 'none'
					})
					// 隐藏
					displayNone();
					$('.aside_section .back').css({
						display: 'none'
					});
		
				})
			} else {
				$('.aside_section .back').css({
					display: 'block'
				});
				//显示
				displayBlock();
				$('.aside_section button').click(function() {
					// 隐藏
					displayNone();
					$('.aside_section .back').css({
						display: 'none'
					});
				})
			}
		
		})
		
	});

})

//页面跳转 案例详情文章获取
function particulars() {
	$('.list a').click(function() {
		window.location.href = "case_details.html?article_id=" + $(this).attr('article_id');
	})
}


//提前报价 信息提示
$('.immediately').click(function() {
	var room = $('.room').val(); //室
	var hall = $('.hall').val(); //厅
	var kitchen = $('.kitchen').val(); //厨房
	var balcony = $('.balcony').val(); //阳台
	var toilet = $('.toilet').val(); //卫生间
	var city = $('.select').val(); //城市
	var area = $('.area').val(); //面积
	var phone = $('.phone').val(); //手机号

	// 隐藏
	displayNone();
	var flag = false; //提示信息
	var message = '';
	var myreg = /^1[34578]\d{9}$/;
	if (phone == '' || area == '') {
		message = "手机号或者面积不能为空！";
	} else if (phone.length != 11) {
		message = "请输入有效的手机或者面积！";
	} else if (!myreg.test(phone)) {
		message = "请输入有效的手机号码！";
	} else {
		flag = true;
		$.ajax({
			type: 'POST',
			url: 'http://www.detaihome.com/website/HouseType',
			data: {
				floor_space: area,
				city_id: city,
				telephone: phone,
				room: room,
				hall: hall,
				kitchen: kitchen,
				balcony: balcony,
				toilet: toilet
			},
			dataType: 'json',
			success: function(data) {
				if (data.error == 'ok') {
					$('.telephone').val("");
				}
			}
		});
	}
	if (!flag) {
		//提示错误效果
		var div = $('<div class="about_decorate_prompt"><div class="error">x</div><div>' + message +
			'</div><button>确定</button></div>');
		$('.aside_section').append(div);
	} else {
		//提示正确效果
		var div = $(
			'<div class="about_decorate_prompt"><div class="sucs">✔</div><div class="successful">信息提交成功，客服人员24小时内和您联系。</div><button>确定</button></div>'
		);
		$('.aside_section').append(div);
	}
	// 点击确定隐藏提示信息
	if (flag == true) {
		$('.aside_section .back').css({
			display: 'block'
		});
		//显示
		displayBlock();

		$('.aside_section button').click(function() {
			$('.about_decorate').css({
				display: 'none'
			})
			// 隐藏
			displayNone();
			$('.aside_section .back').css({
				display: 'none'
			});

		})
	} else {
		$('.aside_section .back').css({
			display: 'block'
		});
		//显示
		displayBlock();
		$('.aside_section button').click(function() {
			// 隐藏
			displayNone();
			$('.aside_section .back').css({
				display: 'none'
			});
		})
	}

})

 
// 立即预约 弹窗
function sendForm() {
	// 隐藏
	displayNone();
	var flag = false;//提示信息
	var message = '';
	var myreg = /^1[34578]\d{9}$/;  
	var city_id = $('.select').val(); //城市
	var telephone = $('.about_body .telephone').val(); //手机号
	
	if(telephone == ''){
		message = "手机号码不能为空！";
		$('.about_body .telephone').val("");
	}else if(telephone.length !=11){
		message = "请输入有效的手机号码！";
		$('.about_body .telephone').val("");
	}else if(!myreg.test(telephone)){
		message = "请输入有效的手机号码！";
		$('.about_body .telephone').val("");
	}else{
		flag = true;
		$.ajax({
			type: 'POST',
			url: 'http://www.detaihome.com/website/HouseType',
			data: {
				telephone:telephone,
				city_id:city_id,
			},
			dataType: 'json',
			success: function(data) {
				if(data.error == 'ok'){
					console.log(data)
					$('.about_body .telephone').val("");
				}
			}
		});
	}
	if(!flag){
     //提示错误效果
		var div = $('<div class="about_decorate_prompt_hide"><div class="about_show"></div><div class="about_decorate_prompt"><div class="error">x</div><div>'+message+'</div><button>确定</button></div></div>');
		$('.us_about_decorate').append(div);
    }else{
	//提示正确效果
		var div = $('<div class="about_decorate_prompt_hide"><div class="about_show"></div><div class="about_decorate_prompt"><div class="sucs">✔</div><div>信息提交成功，客服人员24小时内和您联系。</div><button>确定</button></div></div>');
		$('.us_about_decorate').append(div);
    }	
	// 点击确定隐藏提示信息
	if (flag == true) {
		$('.about_decorate_prompt_hide').css({display:'block'});
		$('.about_decorate_prompt_hide button').click(function(){
			$('.about_decorate').css({display:'none'})
			$('.about_decorate_prompt_hide').css({display:'none'});
		})
	} else{
		$('.about_decorate_prompt_hide').css({display:'block'});
		$('.about_decorate_prompt_hide button').click(function(){
			$('.about_decorate_prompt_hide').css({display:'none'})
		})
	}
}


//获取装修案例  
	//无硬装
function finish_both(el) {
	var alist = $('<div class="list" article_id="' + el.id + '">' +
						'<a href="javascript:;" article_id="' + el.id + '">' +
							'<img src="http://www.detaihome.com' + el.article_banner + '" alt="案例故事">' +
							'<div class="center">' +
								'<div>' +
									'<div>' + el.title + '</div>' +
								'</div>' +
							'</div>' +
						'</a>' +
						'<div>' +
							'<a href="javascript:;" article_id="' + el.id + '">感受他们的故事</a>' +
							'<button>预约咨询</button>' +
						'</div>' +
					'</div>')
		$(".the_article_body").append(alist);
}

//获取首页装修案例  单数
	//有硬装
function finish_singular(el) {
	var alist = $('<div class="list" article_id="' + el.id + '">' +
						'<a href="javascript:;" article_id="' + el.id + '">' +
							'<img src="http://www.detaihome.com' + el.article_banner + '" alt="案例故事">' +
							'<div class="center">' +
								'<div>' +
									'<div>' + el.title + '</div>' +
									'<p>硬装:' + el.hard_outfit + '</p>' +
								'</div>' +
							'</div>' +
						'</a>' +
						'<div>' +
							'<a href="javascript:;" article_id="' + el.id + '">感受他们的故事</a>' +
							'<button>预约咨询</button>' +
						'</div>' +
					'</div>')
	$(".the_article_body").append(alist);
}


//获取首页装修案例  双数
function case_both(el,num) {
	var alist = $('<a class="list" href="javascript:;" article_id="' + el.id + '"><div class="real_top" article_id="' + el.id + '"><div class="real_top_left"><h1>' + num + '</h1><div class="title">' +
		el.title + '</div></div><div class="margin_right"><img src="http://www.detaihome.com' + el.article_banner +
		'" alt="案例"></div></div></a>')
		$(".real_body").append(alist);
}
//获取首页装修案例  单数
function case_singular(el,num) {
	var alist = $('<a class="list" href="javascript:;" article_id="' + el.id + '"><div class="real_top" article_id="' + el.id + '"><div><img src="http://www.detaihome.com' + el.article_banner +
		'" alt="案例"></div><div class="real_top_left margin_left"><h1>' + num + '</h1><div class="title">' +
		el.title + '</div></div></div></a>')
	$(".real_body").append(alist);
}
//获取首页装修案例 
function fitment_both(el,num) {
	var alist = $('<a class="list" href="javascript:;" article_id="' + el.id + '"><div class="real_top" article_id="' + el.id + '"><div class="real_top_left"><h1>' + num + '</h1><div class="title">' +
		el.title + '</div><div class="price">硬装：' + el.hard_outfit +
		'</div><div class="price">软装：' + el.soft_outfit +
		'</div></div><div class="margin_right"><img src="http://www.detaihome.com' + el.article_banner +
		'" alt="案例"></div></div></a>')
	$(".real_body").append(alist);
}
//获取首页装修案例
function fitment_singular(el,num) {
	var alist = $('<a class="list" href="javascript:;" article_id="' + el.id + '"><div class="real_top" article_id="' + el.id + '"><div><img src="http://www.detaihome.com' + el.article_banner +
		'" alt="案例"></div><div class="real_top_left margin_left"><h1>' + num + '</h1><div class="title">' +
		el.title + '</div><div class="price">硬装：' + el.hard_outfit +
		'</div><div class="price">	软装：' + el.soft_outfit + '</div></div></div></a>')
	$(".real_body").append(alist);
}




