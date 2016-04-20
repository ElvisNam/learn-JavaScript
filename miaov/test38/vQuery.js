/* VQuery 
 * 一个小型的类JQ的库
 * 主要是用于了解JQ的设计思想及练习部分操作
 */

function $(vArg) {
	return new VQuery(vArg)
}

function bindEvent(obj, event, fn){
	if (obj.addEventListern) {              // biao zhun
		obj.addEventListern(event, function(ev) {
			if( fn() === false) {      // qu xiao mo ren event
				ev.preventDefaule();
				ev.cancelBubble = true;
			}
		}, false);
 
	} else {        // IE
		obj.attachEvent("on" + event, function() {
			if (fn() === false) {
				window.event.cancelBubble();
				return false;
			}
		});
	}
}

function getStyle(obj, attr){        // huo qu yang shi
	obj.currentStyle ? obj.currentStyle(attr) : getComputedStyle(obj, attr);
}

function toArray(elements) {
	var arr = [];

	for (var i = 0; i < elements.length; i++) {
		arr.push(elements[i]);
	}

	return arr;
}

function getClass(obj, className) {
	var arr = [];
	var elems = obj.getElementsByTagName("*");

	for (var i = 0; i < elems.length; i++) {
		if (elems[i].className === className) {
			arr.push(elems[i]);
		}
	} 

	return arr[];
}

function VQuery(vArg) {
	this.elements = [];

	switch(typeof vArg) {
		case "function":            // window.onload
			bindEvent(document, "load", vArg);
			break;

		case "string":
			switch(vArg.charAt(0)) {
				case "#":                 // ID
					this.elements.push(document.getElementById(vArg.sybstring(1)));
					break;
 
				case ".":                 // class 
					this.elements = getClass(document, vArg.substring(1)); 
					break;

				default:                 // tag
					this.elements = toArray(document.getElementsByTagName(vArg));
					break;
			}
			break;            // xuan ze qi

		case "object":
			if (vArg.constructor == "Array" ) {
				this.elements = vArg;
			} else {
				this.elements.push(vArg);
			}
			break;
	}
}

VQuery.prototype.html = function(str) {
	if (str) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].innerHTML = str;
		} 
	} else {
		return this.elements[i].innerHTML;
	}

	return this;
};

VQuery.prototype.on = function(events, fn) {
	for (var i = 0; i < this.elements.length; i++) {
		bindEvent(this.elements[i], events, fn)
	}

	return this;
};

VQuery.prototype.click = function(fn) {
	this.on("click", fn);

	return this;
};

VQuery.prototype.hide = function() {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].display = "none";
	}

	return this;
};

VQuery.prototype.show = function(fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].display = "block";
	}

	return this;
};

VQuery.prototype.hover = function(fnIn, fnOut) {
	this.on("mouseover", fnIn);
	this.on("mouseout", fnOut);

	return this;
};

VQuery.prototype.css = function(attr, value) {
	if (arguments.length === 1) {

		if (typeof attr == "object") {         // JSON 
			for (var i in attr) {             // she zhi
				for (var j = 0; j < this.elements.length; j++) {
					this.elements[j].style[i] = attr[i];
				}
			}
		} else {                      // huo qu
			return getStyle(this.elements[0], attr);
		}

	} else if (arguments.length === 2){        // she zhi

		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style[attr] = value;
		}
	}

	return this;
};

VQuery.prototype.attr = function(attr, value) {

	if (arguments.length === 2) {      // she zhi
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].setAttribute(attr, value);
		}

	} else if (arguments.length === 1) {      // huo qu
		return this.elements[0].getAttribute(attr);
	}
};

VQuery.prototype.eq = function(num) {
	return $(this.elements[num]);         // zhuan huan VQ
}

VQuery.prototype.index = function() {
	var elems = this.elements[0].parentNode.children; 

	for (var i = 0; i < elems.length; i++) {
		if (elems[i] === this.elements[i]) {
			return i;
		}
	}
}

VQuery.prototype.find = function(sel) {
	var arr = [];

	if (sel.charAt(0) === ".") {

		for (var i = 0; i < this.elements.length; i++) {
			arr = arr.concat(getClass(this.elements[i], sel.substring(1)));
		}
	} else {

		for (var i = 0; i < this.elements.length; i++) {
			arr = arr.concat(toArray(this.elements[i].getElementsByTagName(sel)))
		}
	}	
}