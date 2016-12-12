/*

	无间断滚动

*/
var speed = 10;//速度

var slider = document.getElementById('slider-box');//容器
var sliderWrapper = document.getElementById('slider-wrapper');//内层容器
var slider1 = document.getElementById('slider1');//正体		

slider1.innerHTML += slider1.innerHTML; //拷贝内容一式两份
slider1.innerHTML += slider1.innerHTML; //考虑内容填不满，一式四份

//改变left位置向左移动，当left值小于等于正体内容，left复位0
function marquee() {
var sLeft = parseInt(slider1.style.left);

if (sLeft <= -slider1.offsetWidth/4) {		
	sLeft = 0;	
}			
sLeft --;
slider1.style.left = sLeft + 'px'; 			
}

//初始化定时器
var timer = setInterval(marquee, speed);

//鼠标移上停止
slider.onmouseover = function() {
window.clearInterval(timer);
}

//鼠标离开继续
slider.onmouseout = function() {
timer = setInterval(marquee, speed);
}

/*
	
	ajax异步加载shujv

*/
/*
	分页参数
*/
var recordCount = 0;//总记录数
var pageSize = 9;//每页多少条
var pageCount = 0;//共几页
var pageNum = 1;//当前页码

// 数据集合
var data;

// 发出同步请求，获得后台数据
$.ajax({
	url: 'js/glJson.json',
	type: 'GET',
	dataType: 'json',
	async:false //同步请求
})
.done(function(json) {
	// 响应的数据赋值给本地变量
	data = json;
})
.fail(function(xhr,status,errorText) { //执行失败
	alert('请求失败:' + errorText);				
});	

// 计算总记录数
recordCount = data.length;
// 计算共几页
pageCount = parseInt(recordCount / pageSize);
if (recordCount % pageSize != 0)
	pageCount ++;

/*
	显示当前指定页码的数据
*/
function showData() {

	// 清空当前表格数据
	$('.main-inner').remove();

	// 计算当前页的数据的起始下标和终止下标
	var start = (pageNum - 1) * pageSize;
	var end = pageNum * pageSize;

	// 得到当前页的数据
	var newArray = data.slice(start,end);

	// 遍历数据动态生成表格
	$.each(newArray, function(index, val) {
		 
		// 动态生成dom表格
		html = '';					 
		html += '<div class="main-inner col-lg-4 col-md-6 col-sm-12" id="main-inner">';
		html += '	<div class="main-warpper">';
		html += '		<div class="main-img">';
		html += '			<img src="images/gl-' + val.id + '.jpg" alt="" style="width:360px;">';
		html += '		</div>';
		html += '		<div class="main-content">';
		html += '			<h4>' + val.title + '</h4>';
		html += '			<div class="main-line">';
		html += '				<div class="main-user">';
		html += '					<i class="glyphicon glyphicon-user"></i>';
		html += '					<a href="#">' + val.name + '</a>';
		html += '					<i class="glyphicon glyphicon-time"></i>';
		html += '					<a href="#">' + val.date + '</a>';
		html += '				</div>';
		html += '				<div class="main-cate">';
		html += '					<i class="glyphicon glyphicon-folder-open"></i>';
		html += '					<a href="#">' + val.keyWord + '</a>';
		html += '				</div>';
		html += '				<div class="main-remark">';
		html += val.remark;
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';

		$(html).appendTo('#main-rongqi');

	});

	/*
		动态显示隐藏分页按钮
	*/
	if (pageNum != 1) {
		$('#firstBtn,#prevBtn').show();
	} else {
		$('#firstBtn,#prevBtn').hide();
	}

	if (pageNum != pageCount ) {
		$('#lastBtn,#nextBtn').show();
	} else {
		$('#lastBtn,#nextBtn').hide();
	}

	// 显示分页信息
	$('#pageInfo').html('共' + recordCount + '条记录，每页' + pageSize + '条，共' + pageCount + '页，当前第' + pageNum + '页');

}	

// 默认加载第一页数据
showData();

// 首页按钮单击事件
$('#firstBtn').click(function(event) {				
	pageNum = 1;
	showData();
});

// 末页按钮单击事件
$('#lastBtn').click(function(event) {				
	pageNum = pageCount;
	showData();
});

// 上页按钮单击事件
$('#prevBtn').click(function(event) {				
	pageNum --;
	
	if (pageNum < 1)
		pageNum = 1;

	showData();
});

// 下页按钮单击事件
$('#nextBtn').click(function(event) {				
	pageNum ++;

	if (pageNum > pageCount)
		pageNum = pageCount;

	showData();
});
