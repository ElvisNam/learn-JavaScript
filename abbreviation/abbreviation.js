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

function displayAbbreviation() 
{
	var abbreviations = document.getElementsByTagName('abbr');
	var defs = new Array();

	if (abbreviations.length < 1) return false;
	for (var i = 0; i<abbreviations.length; i++)
	{
		var definition = abbreviations[i].getAttribute('title');
		var key = abbreviations[i].lastChild.nodeValue;
		defs[key] = definition;
	}

	var dlist = document.createElement('dl');
	for (key in defs)
	{
		var definition = defs[key];
		
		var dtitle = document.createElement('dt');
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);

		var ddesc = document.createElement('dd');
		var ddsec_text = document.createTextNode(definition);
		ddesc.appendChild(ddsec_text);

		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}

	var header = document.createElement('h2');
	var header_text = document.createTextNode('Abbreviations');
	header.appendChild(header_text);

	document.body.appendChild(header);
	document.body.appendChild(dlist);
}

function displayCitations()
{
	var quote = document.getElementsByTagName('blockquote');

	for (var i = 0; i < quote.length; i++)
	{
		var url = quote[i].getAttribute('cite');
		var quoteChildren = quote[i].getElementsByTagName('*');
		var elem = quoteChildren[quoteChildren.length - 1];

		var link = document.createElement('a');
		var link_text = document.createTextNode('source');
		link.appendChild(link_text);
		link.setAttribute('href', url);

		var superscript = document.createElement('sup');
		superscript.appendChild(link);
		elem.appendChild(superscript);
	}
}

function displayAccessKey()
{
	var links = document.getElementsByTagName('a');
	var akeys = new Array();

	for (var i = 0; i < links.length; i++)
	{
		var current_link = links[i];

		if (!current_link.getAttribute('accesskey')) continue;

		var key = current_link.getAttribute('accesskey');
		var text = current_link.lastChild.nodeValue;

		akeys[key] = text;
	}

	var list = document.createElement('ul');

	for (key in akeys)
	{
		var text = akeys[key];
		var str = key + ": " + text;
		var liem = document.createElement('li');
		var liem_text = document.createTextNode(str);

		liem.appendChild(liem_text);
		list.appendChild(liem);
	}

	var header = document.createElement('h2');
	var header_text = document.createTextNode('Accesskey');
	header.appendChild(header_text);

	document.body.appendChild(header);
	document.body.appendChild(list);
}

addLoadEvent(displayCitations);
addLoadEvent(displayAbbreviation);
addLoadEvent(displayAccessKey);