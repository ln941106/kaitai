var gulp = require("gulp");

// npm i gulp-uglify --save-dev
var uglify = require("gulp-uglify");  //引入js压缩插件

// npm i gulp-rename --save-dev
var rename = require("gulp-rename");  //引入重命名缩插件



//  创建一个gulp的任务
// gulp.task( "js",function(){
// 	gulp.src('../js/index.js') //压缩文件
// 	.pipe(uglify())		//执行压缩
// 	.pipe(rename('index.min.js'))	//重命名
// 	.pipe(gulp.dest('dist/js'));  //输出文件位置
// } );

// gulp.task('default',function () {
// 	gulp.watch('../js/index.js',['js'])
// });

gulp.task("default",async ()=>{
	gulp.watch("../js/index.js",async ()=>{
		gulp.src("../js/index.js")
		.pipe(uglify())		//执行压缩
		.pipe(rename('index.min.js'))	//重命名
		.pipe(gulp.dest("dist/js"));
	});
})