function addLoadEvent(func)
{
	var oldonload = window.onload;

	if (typeof window.onload != 'function')
		window.onload = func;
	else
	{
		window.onload = function ()
		{
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement)
{
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement)
		parent.appendChild(newElement);
	else
		parent.insertBefore(newElement, targetElement.nextSibling);
}

function prepareSlideshow()
{
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');

	var preview = document.createElement('img');
	preview.setAttribute('id', 'preview');
	preview.setAttribute('src', 'images/01.png');
	preview.setAttribute('alt', 'building blocks of web design');
	slideshow.appendChild(preview);

	var linklist = document.getElementById('linklist');
	insertAfter(slideshow, linklist);

	var links = linklist.getElementsByTagName('a');
	links[0].onmouseover = function() {
		moveElement('preview', 0, 0, 10);
	}
	links[1].onmouseover = function() {
		moveElement('preview', -150, 0, 10);
	}
	links[2].onmouseover = function() {
		moveElement('preview', -300, 0, 10);
	}
	links[3].onmouseover = function() {
		moveElement('preview', -450, 0, 10);
	}
}

function moveElement(elementID, final_x, final_y, interval)
{
	var elem = document.getElementById(elementID);
	if (elem.movement)
		clearTimeout(elem.movement);
	if (!elem.style.left)
		elem.style.left = '0px';
	if (!elem.style.top)
		elem.style.top = '0px';

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;

	if (xpos == final_x && ypos == final_y)
		return true;
	if (xpos < final_x)
	{
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos > final_x)
	{
		dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos > final_y)
	{
		dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	if (ypos < final_y)
	{
		dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}

	elem.style.left = xpos + 'px';
	elem.style.top = ypos + 'px';
	//var repeat = 'moveElement(' + elementID + ', ' + final_x + ', ' + final_y + ', ' + interval + ')';
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat, interval);
}



addLoadEvent(prepareSlideshow);
addLoadEvent(moveElement);
