// Document Ready
$(function() {
	initButtonListeners();
});

var opChain = "";
var output = "";

function initButtonListeners() {
	$("button").click(function(event) {
		if(!isNaN($(this).text())) {
			addDigit(Number($(this).text()));
		}
		else if($(this).text() === ".") {
			addDecimal();
		}
		else if($(this).text() === "AC") {
			allClear();
		}
		else if($(this).text() === "CE") {
			clearEntry();
		}
		else if($(this).text() === "=") {
			eval();
		}
		else {
			addOp($(this).text());
		}
	});
}

function addDigit(value) {
	if(output === "DIGIT LIMIT MET") {
		allClear();
	}
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
	if(output === "DIGIT LIMIT MET") {
		allClear();
	}
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
	if(output === "DIGIT LIMIT MET") {
		allClear();
	}
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
	output = "&nbsp;";
	displayOutput();
	displayOpChain();
}

function displayOpChain(total) {
	// Display operation and result
	if(total) {
		opChain += "=" + total;
	}
	if(opChain.length > 29) {
		output = "DIGIT LIMIT MET";
		opChain = "";
		displayOutput();
	}
	$("#operations").text(opChain);
}

function displayOutput(value) {
	if(value) {
		output = value;
	}
	if(output.length > 15) {
		output = "DIGIT LIMIT MET";
		opChain = "";
		displayOpChain();
	}
	$("#output").html(output);
}

// TODO if user hits equals multiple times, repeat last operation
// TODO represent numbers like .000002 as 2E-7
function eval() {
	if(!/=/.test(opChain)) {
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
}
