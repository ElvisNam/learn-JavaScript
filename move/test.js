var color = "blue";
function changecolor(){
	var anothercolor = "red";
	function swapcolor(){
		var tempcolor = anothercolor;
		anothercolor = color;
		color = tempcolor; 

		alert(tempcolor);
		alert(anothercolor);
		alert(color);
	}

	swapcolor();
	alert(anothercolor);
	alert(color);
}
changecolor();

alert(color);