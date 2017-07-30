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
				addOp(".");
				break;
		}

	});
}

function addDigit(value) {
	opChain += value;
	displayOpChain();
}

function addOp(value) {
	if(/[0-9]/.test(opChain[opChain.length - 1])) {
		if(opChain.match(/[^0-9]/) === null) {
			opChain += value;
			displayOpChain();
		}
		else if(opChain.split("").reverse().join("").match(/[^0-9]/)[0] !== "." || value !== ".") {
			opChain += value;
			displayOpChain();
		}
	}
}

function allClear() {
	opChain = "";
	displayOpChain();
}

function clearEntry() {
	if(/[^0-9]/.test(opChain[opChain.length - 1])) {
		opChain = opChain.substring(0, opChain.length - 1);
	}
	else {
		opChain = opChain.substring(0, opChain.lastIndexOf(opChain.match(/[0-9|.]*$/)));
	}
	displayOpChain();
}

function displayOpChain(total) {
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
	displayOutput(total);
	displayOpChain(total);
}