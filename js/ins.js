/*
	
	作者：Mrsure

*/




/*
	动态加载内容
*/

var htmlStr = '';
var objimg = 20;

$('#loadMore').click(function(event) {

	//加载效果
	$('#loadMore span').css('display', 'none');
	$('#loadMore svg').css('display', 'block');


	var timerId = setInterval(function(){

		/*
			瀑布流
		*/
		(function ($){

			var handler = $('#tiles li');
		  
			handler.wookmark({
		      // Prepare layout options.
		      autoResize: true, // This will auto-update the layout when the browser window is resized.
		      container: $('#main'), // Optional, used for some extra CSS styling
		      offset: 0, // Optional, the distance between grid items
		      outerOffset: 0, // Optional, the distance to the containers border
		      itemWidth: 230 ,// Optional, the width of a grid item
		      flexibleWidth: 285
		  });

			// 点击图片显示模态图
		    $('a', handler).colorbox({
		      rel: 'lightbox'
		    });

		})(jQuery);




		for (var i = 1;i <= 5;i ++) {

			htmlStr = '';
			htmlStr += '<li>';
			htmlStr += '	<div class="mask">';
			htmlStr += '		<span>';
			htmlStr += '			Matthieu Zellweger 摄影作品';
			htmlStr += '		</span>';
			htmlStr += '	</div>';
			htmlStr += '	<a href="images/lg-' + (objimg + i) + '.jpg"><img src="images/lg-' + (objimg + i) + '.jpg" width="280"></a>';
			htmlStr += '</li>';

			var objimgNew = objimg + i;

			if ( objimgNew > 50 ) {
				alert('没有更多图片了...');
				//清除加载效果
				$('#loadMore span').css('display', 'block');
				$('#loadMore span').html('没有更多图片了~');
				$('#loadMore svg').css('display', 'none');
				clearInterval(timerId);
				return;
			}else{
				$('#tiles').append(htmlStr);
			}
		}

		objimg = objimgNew;

		//清除加载效果
		$('#loadMore span').css('display', 'block');
		$('#loadMore svg').css('display', 'none');
		//清除定时器
		clearInterval(timerId);
			
	},1000);

	

	
});

$('#loadMore').click();

/*

	回到顶部功能

*/
$('#backtoTop').click(function(event) {

	//获得滚动条到顶部距离
	var scrollT = $(window).scrollTop();

	function returnTop() {

		if (scrollT <= 0) {
			clearInterval(timerId);//当滚动条长度为0时清楚定时器
			return;
		}
		//滚动条每次长度-30然后把新的高度重新赋值给滚动条高度
		scrollT -= 30;
		$(window).scrollTop(scrollT);
	}

	var timerId = window.setInterval(returnTop,0.5);
	
});







