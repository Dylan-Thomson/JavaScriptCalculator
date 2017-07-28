// Document Ready
$(function() {
	initButtonListeners();
});

var opchain = "";


function initButtonListeners() {
	$("button").click(function(event) {
		switch($(event.target).attr("id")) {
			case "one": 
				addDigit(1);
				break;
			case "two": 
				addDigit(2);
				break;
			case "three": 
				addDigit(3); 
				break;
			case "four": 
				addDigit(4); 
				break;
			case "five": 
				addDigit(5);
				break;
			case "six": 
				addDigit(6); 
				break;
			case "seven": 
				addDigit(7);
				break;
			case "eight": 
				addDigit(8);
				break;
			case "nine": 
				addDigit(9);
				break;
			case "zero": 
				addDigit(0);
				break;
			case "ac":
				opchain = "";
				console.log(opchain);
				break;
			case "ce":
				console.log("ce");
				break;
			case "divide":
				addOp("÷");
				break;
			case "multiply":
				addOp("x");
				break;
			case "minus":
				addOp("-");
				break;
			case "add":
				addOp("+");
				break;
			case "equals":
				addOp("=");
				break;
			case "decimal":
				addOp(".");
				break;
		}
	});
}

function addDigit(value) {
	opchain += value;
	console.log(opchain);
}

function addOp(value) {
	if(/[0-9]/.test(opchain[opchain.length - 1])) {
		opchain += value;
		console.log(opchain);
	}
}