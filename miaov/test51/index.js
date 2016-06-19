/* JS DOCUMENT OF TEST51 */

/* 通用函数 */
function removeClass(obj, className) {
	var classList = obj.className.split(" ");

	if (!obj.className) {
		return;
	}

	for (var i = 0; i < classList.length; i++) {
		if (classList[i] === className) {
			classList.splice(i, 1);
		}
	}

	obj.className = classList.join(" ");
}

function addClass(obj, className) {
	var classList = obj.className.split(" ");

	if (!obj.className) {
		obj.className = className;
		return;
	}

	for (var i = 0; i < classList.length; i++) {
		if (classList[i] === className) {
			return;
		}
	}

	classList.push(className);
	obj.className = classList.join(" ");
}
/* 通用函数结束 */


/*
 * welcome欢迎页函数
 * 主要操作：缓冲index页面图片
 * 等待图片缓冲完毕后且至少停留5s后欢迎页消失，进入index默认主页 
 */
function fnWelcome() {
	var oDate = new Date(),
	    oWelcome = document.getElementById("welcome"),
	    beginTime = oDate.getTime(),
	    btnTime = false, 
	    btnImg = false,
	    timer = null,
	    imgList = ["images/photos/1.jpg", "images/photos/2.jpg", "images/photos/3.jpg", "images/photos/4.jpg", "images/photos/5.jpg"],
	    count = imgList.length;
	  
	oWelcome.addEventListener("WebkitTransitionEnd", fnEnd, false);
	oWelcome.addEventListener("transitionend", fnEnd, false);

	// 定时器用于计算时间并判定是否满足进入下一页的条件
	timer = setInterval(function(){
		if (new Date().getTime() - beginTime > 5000) {
			btnTime = true;
		}
		
		if (btnImg && btnTime) {
			clearInterval(timer);
			oWelcome.style.opacity = 0;
		}
	}, 1000)

	// 缓冲index页图片
	for (var i = 0; i < imgList.length; i++) {
		var oImg = new Image();

		oImg.src = imgList[i];

		oImg.onload = function() {
			count--;

			if (count === 0) {
				btnImg = true;
			}
		}
	}

	function fnEnd() {
		removeClass(oWelcome, "pageShow");
		fnIndex();
	}
}

function fnIndex() {
	indexTab()
}

// index图片滚动函数
function indexTab() {
	var oIndex = document.getElementById("index"),
		picTab = oIndex.getElementsByClassName("picTab")[0],
		picList = oIndex.getElementsByClassName("picList")[0],
		navList = oIndex.getElementsByClassName("navList")[0],
		navSpan = oIndex.getElementsByTagName("span"),
		oLi = picList.getElementsByTagName("li"),

		downX = null,
		moveStart = 0,
		srcollMove = 0,
		iNow = 0,
		timer = null;

	picTab.addEventListener("touchstart", fnStart, false);
	picTab.addEventListener("touchmove", fnMove, false);
	picTab.addEventListener("touchend", fnEnd, false);

	autoPlay();

	function fnStart(ev) {
		var touch = ev.changedTouches[0];

		picList.style.WebkitTransition = "none";
		picList.style.transition = "none";

		clearInterval(timer);

		downX = touch.pageX;

		moveStart = srcollMove;
	}

	function fnMove(ev) {
		var touch = ev.changedTouches[0],
			nowPage = touch.pageX,

			dis = nowPage - downX;

		srcollMove = moveStart + dis;

		picList.style.WebkitTransform = "translateX(" + srcollMove + "px)";
		picList.style.transform = "translateX(" + srcollMove + "px)";
	}

	function fnEnd() {
		iNow = - srcollMove / document.documentElement.clientWidth;

		iNow = Math.round(iNow);

		if (iNow > oLi.length - 1) {
			iNow = oLi.length - 1;
		}

		if (iNow < 0) {
			iNow = 0;
		}

		next();
		autoPlay();
	}

	function next() {
		iNow = iNow % oLi.length;

		for (var i = 0; i < navSpan.length; i++){
			navSpan[i].className = "";
		}
		navSpan[iNow].className = "active";

		srcollMove = - iNow * document.documentElement.clientWidth;

		picList.style.WebkitTransition = ".5s";
		picList.style.transition = ".5s";

		picList.style.WebkitTransform = "translateX(" + srcollMove + "px)";
		picList.style.transform = "translateX(" + srcollMove + "px)";
	}

	// 自动播放函数
	function autoPlay() {
		timer = setInterval(function() {
			iNow++;
			next();
		}, 2000)
	}
}