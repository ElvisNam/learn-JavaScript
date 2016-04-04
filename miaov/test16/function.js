
//样式获取函数
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}


//移动函数, 参数为(移动对象, 移动方向, 每次移动距离大小, 移动终点, 回调函数)
function moveTo(obj, attr, dir, target, endFn) {
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var pos = parseInt(getStyle(obj, attr)) + dir;
		
		if (pos > target && dir > 0 || pos < target && dir < 0 ){
			pos = target;
		}
		
		obj.style[attr] = pos + "px";

		if (target === pos) {
			clearInterval(obj.timer);
		}

		if (endFn) {
			endFn;
		}
	}, 200);
}