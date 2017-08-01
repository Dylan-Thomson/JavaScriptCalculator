// Document Ready
$(function() {
	initButtonListeners();
});

var opChain = "";
var output = "";

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
				allClear();
				break;
			case "ce":
				clearEntry();
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
				eval();
				break;
			case "decimal":
				addDecimal();
				break;
		}

	});
}

function addDigit(value) {
	// Clear previous operation
	if(/=/.test(opChain)) {
		opChain = value.toString();
		output = "";
	}
	else if(/[x÷+-]/.test(output)) {
		output = "";
		opChain += value;
	}
	else {
		opChain += value;
	}
	displayOpChain();
	output += value;
	displayOutput();
}

function addOp(value) {
	// Get previous total and use for next calculation
	if(/=/.test(opChain)) {
		opChain = opChain.substring(opChain.match(/=/)["index"] + 1);
	}
	// Add operand if last digit is a number
	if(/\d/.test(opChain[opChain.length - 1])) {
		opChain += value;
		displayOpChain();
		displayOutput(value);
	}
}

function addDecimal() {
	// Clear previous operation
	if(/=/.test(opChain)) {
		output = ".";
		opChain = ".";
	}
	// Add decimal if there are no nondigit characters
	if(!/\D/.test(opChain)) {
			opChain += ".";
			output += ".";
	}
	// Add decimal if last nondigit character is not a decimal
	else if(opChain.split("").reverse().join("").match(/\D/)[0] !== ".") {
		if(/[x÷+-]/.test(output)) {
			output = ".";
		}
		else {
			output += ".";
		}
		opChain += ".";
	}
	displayOpChain();
	displayOutput();
}

// Clear everything
function allClear() {
	opChain = "";
	displayOpChain();
	output = "";
	displayOutput(0);
}


function clearEntry() {
	// Clear equals
	if(/=/.test(opChain)) {
		opChain = opChain.substring(0, opChain.match(/=/)["index"]);
	}
	// If last char is nondigit, remove it
	else if(/\D/.test(opChain[opChain.length - 1])) {
		opChain = opChain.substring(0, opChain.length - 1);
	}
	// Else remove last number
	else {
		opChain = opChain.substring(0, opChain.lastIndexOf(opChain.match(/[\d.]*$/)));
	}
	output = "";
	displayOutput();
	displayOpChain();
}

function displayOpChain(total) {
	// Display operation and result
	if(total) {
		opChain += "=" + total;
	}
	$("#operations").text(opChain);
}

function displayOutput(value) {
	if(value) {
		output = value;
	}
	$("#output").text(output);
}

function eval() {
	var numbers = opChain.split(/[^0-9|.]/);
	var operands = opChain.split(/[0-9|.]/).filter(function(el) {return el.length != 0});
	var total = Number(numbers.shift());

	for(var i = 0; i < operands.length; i++) {
		switch(operands[i]) {
			case "+":
				total += Number(numbers[i]);
				break;
			case "-":
				total -= Number(numbers[i]);
				break;
			case "x":
				total *= Number(numbers[i]);
				break;
			case "÷":
				total /= Number(numbers[i]);
				break;
		}
	}
	displayOutput(Number(total.toFixed(5)).toString());
	displayOpChain(Number(total.toFixed(5)).toString());
}

$("#test1").on("click", function(event) {
	$("#one").click();
	$("#decimal").click();
	$("#three").click();
	$("#minus").click();
	$("#decimal").click();
	$("#four").click();
	$("#five").click();
	$("#add").click();
	$("#six").click();
	$("#seven").click();
	$("#equals").click();
	$("#minus").click();
	$("#eight").click();
	$("#equals").click();
});
