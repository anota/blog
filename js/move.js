function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}

function startMove(obj,json,fnBack){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(attr in json){
			var iCur = 0;
			if(attr != "opacity")
			{
				iCur = parseInt(getStyle(obj,attr)) || 0;
			}else{
				iCur = Math.round(parseFloat(getStyle(obj,attr)) * 100) || 100;
			}

			var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if(iCur != json[attr])
			{
				bStop = false;
			}
			if(attr == "opacity")
			{
				obj.style.opacity = (iCur + iSpeed)/100;
				obj.style.filter = "alpha(opacity="+ (iCur + iSpeed) +")"
			}else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}

		if(bStop)
		{
			clearInterval(obj.timer);
			obj.timer = null;
			if(fnBack)fnBack.call(obj);
		}
	},30)

}