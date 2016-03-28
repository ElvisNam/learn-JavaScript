
//样式获取函数
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}


//移动函数, 参数为(移动对象, 移动方向, 每次移动距离大小, 移动终点, 回调函数)
function moveTo(obj, attr, dir, target, endFn) {
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	
	clearInterval(obj.move);

	obj.move = setInterval(function() {
		var pos = parseInt(getStyle(obj, attr)) + dir;
		
		if (pos > target && dir > 0 || pos < target && dir < 0 ){
			pos = target;
		}
		
		obj.style[attr] = pos + "px";

		if (target === pos) {
			clearInterval(obj.move);
			endFn && endFn();
		}

	}, 200);
}

//透明度改变函数, 参数为(改变的对象, 改变的速度, 目标, 回调函数) 
function opacityChange(obj, speed, target, endFn) {
 	speed = parseFloat(getStyle(obj, "opacity")) < target ? speed : -speed;

 	clearInterval(obj.opacity);
 	
 	obj.opacity = setInterval(function(){

 		var cur = parseFloat(getStyle(obj, "opacity")) + speed;
 		
 		if (cur > target && speed > 0 || cur < target && speed < 0 ){
			cur = target;
		}

 		obj.style.opacity = cur;

 		if (target === cur) {
			clearInterval(obj.timer);
			endFn && endFn();
		}

 	}, 100);
}

//抖动函数, 参数为(抖动对象, 抖动的属性, 当前属性的位置, 抖动程度, 回调函数)
function shake(obj, attr, pos, deep, endFn) {
	var arr = [];
	var num = 0;
	//var pos = parseInt(getStyle(obj, attr));

	for (var i = deep; i >= 0; i-=2) {
		arr.push(i, -i);
	}
	arr.push(0);

	clearInterval(obj.shake);

	obj.shake = setInterval(function(){
		obj.style[attr] = pos + arr[num] + "px";
		num++;
		
		if(num === arr.length) {
			clearInterval(obj.shake);
			num = 0;
			endFn && endFn();
		}
	}, 50);
}

//倒计时函数  参数str为设置需要倒计时的时间(字符串形式)
function countDown(str) {
	var oNow = new Date();
	var oFuture = new Date(str);
	var str = "";

	t = oFuture - oNow;
	t /= 1000;
	if (t >= 0){
		oDay = Math.floor(t / 86400);
		oHour = Math.floor(t % 86400 / 3600);
		oMinute = Math.floor(t % 86400 % 3600 /60);
		oSeconds = Math.floor(t % 60);

		str = "剩余" + toTwo(oDay) + "天" +toTwo(oHour) + "时" + toTwo(oMinute) + "分" + toTwo(oSeconds) + "秒";
		return str;
	} else {
		return str = "";
	}
}