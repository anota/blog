// JavaScript Document
//简单封装滑屏执行
var wipe = {
	wipeLeft:function(){
		document.title = '你滑的是左边';
		
	},wipeRight:function(){
		document.title = '你滑的是右边';
	}
}
function touchwipe(obj)
{
	var startX = null;
	var startY = null;
	obj.addEventListener("touchstart",onTouchStart,false);
	function onTouchStart(e)
	{
		startX = e.touches[0].pageX;
		document.addEventListener("touchmove",onTouchMove,false);
	};
	function onTouchMove(e)
	{
		e.preventDefault();
		var disX = startX - e.touches[0].pageX;
		if(Math.abs(disX) >= 20)
		{
			startX = null;
			document.removeEventListener('touchmove',onTouchMove,false);
			if(disX>0)
			{
				wipe.wipeLeft();
			}else{
				wipe.wipeRight();
			}
		};
	};
};
//执行吧 孩子
touchwipe(document);