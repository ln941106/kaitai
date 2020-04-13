
//关于我们页面
//选择左侧导航
$('.about_us_navigation>div').click(function () {
	$('.about_us_navigation>div').removeClass('about_choose');
	$(this).addClass('about_choose');
	$('.about_us_content>div').eq($(this).index()).addClass('contact_show').siblings('.about_us_content>div').removeClass('contact_show');

})
/* 地图开始 */
// lng: 117.152078,
// 		lat: 36.680196,
var points = [ {
		id: 4,
		lng: 117.152078,
		lat: 36.680196,
		title: "凯泰科技",
		content: ["地址：山东省济南市高新区舜风路322号同科大厦院内12号楼", "电话：400-616-9716"]
	}];

	var map = new BaiduMap({
		id: "container3",
		level: 16, //  选填--地图级别--(默认15)
		zoom: true, // 选填--是否启用鼠标滚轮缩放功能--(默认false)
		type: ["地图", "卫星", "三维"], // 选填--显示地图类型--(默认不显示)
		width: 320, // 选填--信息窗口width--(默认自动调整)
		height: 70, // 选填--信息窗口height--(默认自动调整)
		titleClass: "title",
		contentClass: "content",
		showPanorama: true, // 是否显示全景控件(默认false)
		showMarkPanorama: true, // 是否显示标注点全景图(默认false)
		showLabel: false, // 是否显示文本标注(默认false)
		mapStyle: "normal", // 默认normal,可选dark,light
		icon: { // 选填--自定义icon图标
			url: "images/marker2.png",
			width: 34,
			height: 94
		},
		centerPoint: { // 中心点经纬度
			lng: 117.152078,
			lat: 36.680196
		},
		index: 3, // 开启对应的信息窗口，默认-1不开启
		animate: true, // 是否开启坠落动画，默认false
		points: points, // 标注点--id(唯一标识)
// 		callback: function(id) {
// 			$(".list").find("li").eq(id - 1).addClass("active").siblings().removeClass("active");
// 		}
	});

// 	var data = map.getPosition();
// 	var $li = $(".list").find("li");
// 
// 	$li.each(function(i) {
// 		$(this).data("id", i + 1);
// 	}).on("click", function() {
// 		map.openInfoWindow($(this).data("id"));
// 		$(this).addClass("active").siblings().removeClass("active");
// 	}).eq(data.id - 1).addClass("active");
/* 地图结束 */

/* 企业大事记 */
$('.about_the_navigation>div').mouseenter(function () {
	$(this).addClass('about_the_active').siblings('.about_the_navigation>div').removeClass('about_the_active')
	//对应索引值的ul添加about_the_show类，其他的删除about_the_show类
	$('.about_the_content>ul').eq($(this).index()).addClass('about_the_show').siblings('.about_the_content>ul').removeClass('about_the_show');
})

