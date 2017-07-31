// Document Ready
$(function() {
	initButtonListeners();
});

var opChain = "";

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

// TODO display current number/operand in output
function addDigit(value) {
	// Clear previous operation
	if(/=/.test(opChain)) {
		opChain = value.toString();
	}
	else {
		opChain += value;
	}
	displayOpChain();
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
	}
}

function addDecimal() {
	// Clear previous operation
	if(/=/.test(opChain)) {
		opChain = ".";
	}
	// Add decimal if there are no nondigit characters
	if(!/\D/.test(opChain)) {
			opChain += ".";
	}
	// Add decimal if last nondigit character is not a decimal
	else if(opChain.split("").reverse().join("").match(/\D/)[0] !== ".") {
		opChain += ".";
	}
	displayOpChain();
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
	displayOpChain();
}

function displayOpChain(total) {
	// Display operation and result
	if(total) {
		opChain += "=" + total;
		console.log(opChain);
	}
	else {
		console.log(opChain);
	}
}

function displayOutput(value) {
	console.log(value);
}

function eval() {
	var numbers = opChain.split(/[\D.]/);
	var operands = opChain.split(/[\d.]/).filter(function(el) {return el.length != 0});
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
	displayOutput(total);
	displayOpChain(total);
}