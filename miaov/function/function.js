
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

//通过类名查找元素函数   参数为 (寻找元素的父元素, 寻找的类名, 寻找的标签类型)
function getElementsByClassName(parent, className, tagName) {
	var aObj = parent.getElementsByTagName(tagName);
	var arr = [];

	for(var i = 0; i < aObj.length; i++) {
		if(aObj[i].className) {

			var aClass = aObj[i].className.split(" ");

			for (var j = 0; j < aClass.length; j++) {
				if(aClass[j] === className) {          //find class
					arr.push(aObj[i]);
					break;
				}
			}
		}
	}

	return arr;
}

//添加类名函数    参数为(要添加的对象, 要添加的类名)
function addClass(obj, className) {
	if(obj.className === "") {            // no class
		obj.className = className;
	} else {
		var aClass = obj.className.split(" ");

		for (var j = 0; j < aClass.length; j++) {
			if(aClass[j] === className) {       // have class  -repeat
				break;
			} 
		}

		if(j === aClass.length) {           // have class -norepeat
			aClass.push(className);

			obj.className = aClass.join(" ");
		}
	}
}

//删除类名函数  参数为(要删除类名的对象, 要删除的类名)
function removeClass(obj, className) {
	if(obj.className !== "") {                
		var aClass = obj.className.split(" ");

		for(var i = 0; i < aClass.length; i++) {
			if(aClass[i] === className) {
				aClass.splice(i, 1);                // remove class
			}

			obj.className = aClass.join(" ");
		}
	}
}