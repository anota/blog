/**
 * 跑马灯Glide
 * @author zhudc 
 * @weibo  @Anota_Ju
 * 实例如下
 * $("#lev2 li").glide({
					 nSkew: 20,//手指移动的像素超过多少像素放开执行
					 nVisible:3,//可见区域box数量
					 nMax:60,//手指最大可以超出限制的区域	
					 });
 */
$.fn.extend({
    glide: function(options) {
        var defaults = {
			nSkew: 20,//手指移动的像素超过多少像素放开执行
			nVisible:4,//可见区域box数量
			nMax:60,//手指最大可以超出限制的区域
			$dragIndex:$("p i")
        }
		
		//初始化
        var options = $.extend(defaults, options);
        var $aDragList = $(this);
        var $oDragWrap = $aDragList.eq(0).parent();
        var disX = disL = nMoveSize = nCurrMove = nMaxRight = nMoveEnd = 0;
        var nWinWidth = $(window).width();
		var nIndexLenght = Math.ceil($aDragList.length / options.nVisible);
		
		//changeClassName
		var indexClass = function()
		{
			var nIndex = -parseInt(nMoveEnd / nWinWidth);
			$dragIndexList.removeClass("on");
			$dragIndexList.eq(nIndex).addClass("on");
		}
		
		//是否需要跑马灯索引
		if(options.$dragIndex)
		{
			var aTags = "";
			for(var i=0 ; i < nIndexLenght; i++)
			{
				aTags += "<"+ options.$dragIndex[0].tagName + "></"+ options.$dragIndex[0].tagName +">";
			}
			//插入标签并获取对象
			$dragIndexList = options.$dragIndex.parent().html(aTags).find(options.$dragIndex[0].tagName);			
			//切换className
			indexClass();
		}
		
        //设置每个box宽度
        $aDragList.width(nWinWidth / options.nVisible);
        //设置父级的宽度
        $oDragWrap.css({
            "cursor": "move",
            "width": nWinWidth *  nIndexLenght
        });
		
		//touchStart
		var eTouStart = function()
		{
			$oDragWrap.bind("touchstart",
            function(event) 
	    	{
				//保持位置在nWinWidth的倍数
                disL = parseInt($oDragWrap.offset().left / nWinWidth) * nWinWidth;
                disX = event.originalEvent.touches[0].clientX - disL;
				//执行touchstart后的时间
				eTouMove();
		    })
		};
		//touchMove
		var eTouMove = function()
		{
			$oDragWrap.bind("touchmove",
            function(event) 
			{
				var event = event || window.event;
				event.preventDefault();
				//手指移动列表页跟着X轴值
                nCurrMove = event.originalEvent.touches[0].clientX - disX;
                nMoveSize = $oDragWrap.offset().left - disL;
                nMaxRight = -($oDragWrap.outerWidth(true) - nWinWidth);
                //右边最大位移
                nCurrMove <= nMaxRight - options.nMax && (nCurrMove = nMaxRight - options.nMax);
                //左边最大位移
                nCurrMove >= options.nMax && (nCurrMove = options.nMax);
                $oDragWrap.css({
                    "webkitTransform": "translate3d(" + nCurrMove + "px, 0, 0)"
                });
				//执行touchmove后的时间
				eTouEnd();
			})
		};
		//touchEnd
		var eTouEnd = function()
		{
			//各种条件
			nMoveEnd = disL;
			nMoveSize > options.nSkew && (nMoveEnd += nWinWidth);
			nMoveSize < -options.nSkew && (nMoveEnd -= nWinWidth);
			nCurrMove <= nMaxRight && (nMoveEnd = nMaxRight);
			nCurrMove >= 0 && (nMoveEnd = 0);
			//console.log($oDragWrap.offset().left);
			//console.log(disL);
			console.log(nMoveSize);
			//console.log(nMoveEnd);
			
			$(document).bind("touchend",
            function() 
			{
				//解除touchmove
                $oDragWrap.unbind("touchmove",null);
				
				//运动				
				$oDragWrap.css({
				    "webkitTransform": "translate3d(" + nMoveEnd + "px, 0, 0)"
                });
				//如果存在索引 touchend执行下面
				options.$dragIndex && indexClass();
            });
		};
		
		//启动一连串的函数
		eTouStart();		
		return false
    }
})