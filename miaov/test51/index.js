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
 * 等待图片缓冲完毕后且至少停留5s后欢迎页消失，进入index默认主页，执行fnIndex()
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
		fnIndex();    // 进入下一层级
	}
}


/*
 * index首页函数
 * 主要操作：执行图片滚动函数indexTab；执行评分函数score
 * 用户评分完毕且添加标签后，点击提交按钮进入mask层，执行fnMak()
 */
function fnIndex() {
	var oIndex = document.getElementById("index"),
		oSubmit = oIndex.getElementsByClassName("submit")[0],
		oSubInfo = oIndex.getElementsByClassName("submitInfo")[0],

		scoreList = oIndex.getElementsByClassName("scoreList")[0],
		inputList = scoreList.getElementsByTagName("input"),
		starList = scoreList.getElementsByClassName("starList"),
		starSpan = null;

		oTag = oIndex.getElementsByClassName("tags")[0],
		tagInput = oTag.getElementsByTagName("input"),

		scoreBtn = true,
		tagsBtn = false;

	if (!window.indexBtn) {
		indexTab();
		score();

		window.indexBtn = true;
	} else {
		for (var i = 0; i < starList.length; i++) {
			starSpan = starList[i].getElementsByTagName("span");
			inputList[i].value = "0"

			for (var j = 0; j < starSpan.length; j++) {
				removeClass(starSpan[j], "active");
			}
		}

		for (var i = 0; i < tagInput.length; i++) {
			tagInput[i].checked = false;
		}
	}

	oSubmit.addEventListener("touchend", submitCheck, false);

	function submitCheck() {
		scoreBtn = true;
		tagsBtn = false;

		for (var i = 0; i < inputList.length; i++) {
			if (inputList[i].value === "0") {
				scoreBtn = false;
				checkInfo(oSubInfo, "请给景区评分");
				return;
			}
		}
	
		for (var i = 0; i < tagInput.length; i++) {
			if (tagInput[i].checked) {
				tagsBtn = true;
				break;
			}
		}

		if (!tagsBtn) {
			checkInfo(oSubInfo, "请给景区添加标签");
			return;
		}

		if (scoreBtn && tagsBtn) {
			fnMask();        // 进入下一层级
		}
	}	
}


/* 
 * mask遮罩层页面函数
 * 主要操作：形成遮罩效果
 * 延时后进入form层，执行fnForm()
 */
function fnMask() {
	var oMask = document.getElementById("mask"),
		oIndex = document.getElementById("index"),
		oForm = document.getElementById("form");

	addClass(oMask, "pageShow");

	setTimeout(function() {
		oMask.style.opacity = 1;
		oIndex.style.WebkitFilter = "blur(5px)";
		oIndex.style.filter = "blur(5px)";
	}, 14);

	setTimeout(function() {
		oMask.style.opacity = 0;

		oIndex.style.WebkitFilter = "blur(0px)";
		oIndex.style.filter = "blur(0px)";
		
		removeClass(oIndex, "pageShow");

		oMask.addEventListener("WebkitTransitionEnd", maskTransitionEnd, false);
		oMask.addEventListener("transitionend", maskTransitionEnd, false);

		function maskTransitionEnd() {
			removeClass(oMask, "pageShow");

			oMask.removeEventListener("WebkitTransitionEnd", maskTransitionEnd, false);
			oMask.removeEventListener("transitionend", maskTransitionEnd, false);
		}

		addClass(oForm, "pageShow");

		fnForm();        // 进入下一层函数
	}, 2000)
}


/*
 * form页面函数
 * 主要操作：用户点击相应视频/图片上传按钮，进行文件格式判断
 * 上传正确文件后直接进入news层，执行fnNews()
 * 点击跳过按钮后，不进行文件上传操作，直接进入over层，执行fnOver()
 */
function fnForm() {
	var oForm = document.getElementById("form"),
		submitInfo = oForm.getElementsByClassName("submitInfo")[0],
		inputList = oForm.getElementsByTagName("input"),
		oSubmit = oForm.getElementsByClassName("submit")[0],
		oNews = document.getElementById("news"),
		oOver = document.getElementById("over");

	inputList[0].addEventListener("change", videoCheck, false);
	inputList[1].addEventListener("change", photoCheck, false);

	oSubmit.addEventListener("touchend", submitChange, false);

	function videoCheck() {
		if (this.files[0].type.split("/")[0] === "video") {
			this.value = "";
			next();
		} else {
			checkInfo(submitInfo, "请上传视频文件");
			this.value = "";
		}
	}

	function photoCheck() {
		if (this.files[0].type.split("/")[0] === "image") {
			this.value = "";
			next();
		} else {
			checkInfo(submitInfo, "请上传图片文件");
			this.value = "";
		}
	}

	function submitChange() {
		removeClass(oForm, "pageShow");
		fnOver();      // 直接进入结束层函数
	}

	function next() {
		addClass(oNews, "pageShow");
		removeClass(oForm, "pageShow");
		fnNews();      // 进入下一层函数
	}
}



/*
 * news页面函数
 * 主要操作：用户给上传的文件添加标签
 * 点击上传按钮进入over结束页面，执行fnOver()
 */
function fnNews() {
	var oNews = document.getElementById("news"),
		oOver = document.getElementById("over"),
		oTags = oNews.getElementsByClassName("tags")[0],
		labelList = oTags.getElementsByTagName("label"),
		inputList = oTags.getElementsByTagName("input"),
		oSubmit = oNews.getElementsByClassName("submit")[0],
		oSubInfo = oNews.getElementsByClassName("submitInfo")[0],
		classList = [];

	if (!window.newsBtn) {
		window.newsBtn = true;
	} else {
		for (var i = 0; i < inputList.length; i++) {
			inputList[i].checked = false;
		}
	}

	for (var i = 0; i < labelList.length; i++) {
		labelList[i].addEventListener("touchend", function() {
			addClass(oSubmit, "submitActive");
		}, false);
	}

	oSubmit.addEventListener("touchend", function() {
		classList = this.className.split(" ");

		if (classList.indexOf("submitActive") === -1) {
			checkInfo(oSubInfo, "请添加标签");
		} else {
			next();
		}
	}, false)

	function next() {
		removeClass(oNews, "pageShow");
		fnOver();
	}
}



/*
 * over页面函数
 * 结束动画，点击重新评价按钮可重新返回index页面再次进行操作 
 */
function fnOver() {
	var oOver = document.getElementById("over"),
		oSubmit = oOver.getElementsByClassName("submit")[0],
		oIndex = document.getElementById("index");

	addClass(oOver, "pageShow");

	oSubmit.addEventListener("touchend", next, false);

	function next() {
		addClass(oIndex, "pageShow");
		removeClass(oOver, "pageShow")
		fnIndex();
	}
}

// index图片滚动函数
function indexTab() {
	var oIndex = document.getElementById("index"),
		picTab = oIndex.getElementsByClassName("picTab")[0],
		picList = oIndex.getElementsByClassName("picList")[0],
		navList = picTab.getElementsByClassName("navList")[0],
		navSpan = navList.getElementsByTagName("span"),
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

// index 评分函数
function score() {
	var oIndex = document.getElementById("index"),
		scoreList = oIndex.getElementsByClassName("scoreList")[0],
		starList = scoreList.getElementsByClassName("starList"),
		starSpan = null;

	for (var i = 0; i < starList.length; i++) {
		starSpan = starList[i].getElementsByTagName("span");

		for (var j = 0; j < starSpan.length; j++) {
			starSpan[j].index = j;
			starSpan[j].addEventListener("touchend", starChange, false);
		}
	}

	function starChange() {
		var parent = this.parentNode,
			children = parent.getElementsByTagName("span"),
			oIpt = parent.getElementsByTagName("input")[0];

		for (var i = 0; i < children.length; i++) {
			children[i].className = "";
		}

		for (var i = 0; i <= this.index; i++) {
			children[i].className = "active";
		}

		oIpt.value = this.index + 1;
	}
}

// 提交信息提示函数
function checkInfo(obj, info) {
	obj.innerHTML = info;

	obj.style.opacity = 1;
	obj.style.WebkitTransform = "scale(1)";
	obj.style.transform = "scale(1)";

	setTimeout(function() {
		obj.style.opacity = 0;
		obj.style.WebkitTransform = "scale(0)";
		obj.style.transform = "scale(0)";
	}, 1000)
}