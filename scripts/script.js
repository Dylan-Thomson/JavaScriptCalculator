// Document Ready
$(function() {
	initButtonListeners();
});

var opchain = "";


function initButtonListeners() {
	$("button").click(function(event) {
		switch($(event.target).attr("id")) {
			case "one": 
				addOpchain(1);
				break;
			case "two": 
				addOpchain(2);
				break;
			case "three": 
				addOpchain(3); 
				break;
			case "four": 
				addOpchain(4); 
				break;
			case "five": 
				addOpchain(5);
				break;
			case "six": 
				addOpchain(6); 
				break;
			case "seven": 
				addOpchain(7);
				break;
			case "eight": 
				addOpchain(8);
				break;
			case "nine": 
				addOpchain(9);
				break;
			case "zero": 
				addOpchain(0);
				break;
			case "ac":
				opchain = "";
				console.log(opchain);
				break;
			case "ce":
				console.log("ce");
				break;
			case "divide":
				addOpchain("÷");
				break;
			case "multiply":
				addOpchain("x");
				break;
			case "minus":
				addOpchain("-");
				break;
			case "add":
				addOpchain("+");
				break;
			case "equals":
				addOpchain("=");
				break;
			case "decimal":
				addOpchain(".");
				break;
		}
	});
}

function addOpchain(value) {
	opchain += value;
	console.log(opchain);
}