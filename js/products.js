// 滚动页面导航
$(document).scroll(function() {
     var scroH = $(document).scrollTop();  //滚动高度
    if(scroH>50){  //距离顶部大于100px时
		$('.ready_title').css({top:0})
		$('.header_title').css({zIndex:2})
    }else{
		$('.ready_title').css({top:50});
		$('.header_title').css({zIndex:3})
	}
});
 
 // 04点击显示搭配方案
 $(function () {
	var index = 0;
	$('.button>button').click(function () {
		$('.button>button').eq($(this).index()).addClass('active').siblings('.button>button').removeClass('active');
		$('.captions_img div div').eq($(this).index()).addClass('zindex').siblings('.captions_img div div').removeClass('zindex');
		index = $(this).index();
	 })
 	var timeid = setInterval(function(){
		index++;
		$('.button>button').eq(index).addClass('active').siblings('.button>button').removeClass('active');
		$('.captions_img div div').eq(index).addClass('zindex').siblings('.captions_img div div').removeClass('zindex');
		if(index===3){
			index = -1;
		}
	},4000);
 })


