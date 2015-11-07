function addLoadEvent(func)
{
	var oldonload = window.onload;

	if (typeof window.onload != 'function') 
		window.onload = func;
	else 
	{
		window.onload = function()
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
	{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function preparePlaceholder()
{
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;

	var placeholder = document.createElement('img');
	placeholder.setAttribute('id', 'placeholder');
	placeholder.setAttribute('src', 'images/placeholder.gif');
	placeholder.setAttribute('lat', 'my image gallery');

	var description = document.createElement('p');
	description.setAttribute('id', 'description');

	var destext = document.createTextNode('choose an image');
	description.appendChild(destext);
	placeholder.appendChild(description);

	var gallery = document.getElementById('imagegallery');
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
}

function prepareGallery() 
{
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;

	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');

	for (var i=0; i < links.length; i++)
	{
		links[i].onclick = function() 
		{
			if (showPic(this))
				return false;
			else return true;
		}
	}
}

function showPic(whichpic)
{
	if (!document.getElementById('placeholder')) return false;

	var source = whichpic.getAttribute('href');
	var placeholder = document.getElementById('placeholder');

	placeholder.setAttribute('src', source);

	if (document.getElementById('description'))
	{
		var text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : "";
		var description = document.getElementById('description');

		if (description.firstChild.nodeType == 3)
		{
			description.firstChild.nodeValue = text;
		}
	}

	return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);