// javascript document

function ajax(method, url, data, endFn) {

	var xhr = null;

	try {
		xhr = new XMLHttpRequest();
	} catch(e) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if (method === "get" & data) {
		url += "?" + data;
	}

	xhr.open(method, url, true);

	if (method === "post") {
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	} else {
		xhr.send();
	}
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				endFn && endFn(xhr.responseText);
			} else {
				alert("REEOR");
			}
		}
	}
}