// Document Ready
$(function() {
	initButtonListeners();
});

let opChain = "";
let output = "";

function initButtonListeners() {
	$("button").click(function(event) {
		const buttonValue = $(this).data("value");

		if(!isNaN(buttonValue)) {
			addDigit(buttonValue);
		}
		else if(buttonValue === ".") {
			addDecimal();
		}
		else if(buttonValue === "ac") {
			allClear();
		}
		else if(buttonValue === "ce") {
			clearEntry();
		}
		else if(buttonValue === "=") {
			eval();
		}
		else {
			addOp(buttonValue);
		}
	});
}

function addDigit(value) {
	if(output === "DIGIT LIMIT") {
		allClear();
	}
	// Clear previous operation
	if(/=/.test(opChain)) {
		opChain = value.toString();
		output = "";
	}
	else if(/[x÷+-]/.test(output)) {
		output = "";
		opChain += " " + value;
	}
	else {
		opChain += value;
	}
	displayOpChain();
	output += value;
	displayOutput();
}

function addOp(value) {
	if(output === "DIGIT LIMIT") {
		allClear();
	}
	// Get previous total and use for next calculation
	if(/=/.test(opChain)) {
		opChain = opChain.substring(opChain.match(/=/)["index"] + 1);
	}
	// Add operand if last digit is a number
	if(/\d/.test(opChain[opChain.length - 1])) {
		opChain += " " + value;
		displayOpChain();
		displayOutput(value);
	}
}

function addDecimal() {
	if(output === "DIGIT LIMIT") {
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
	if(opChain.length > 21) {
		output = "DIGIT LIMIT";
		opChain = "";
		displayOutput();
	}
	$("#operations").text(opChain);
}

function displayOutput(value) {
	if(value) {
		output = value;
	}
	if(output.length > 10) {
		output = "DIGIT LIMIT";
		opChain = "";
		displayOpChain();
	}
	$("#output").html(output);
}

// TODO if user hits equals multiple times, repeat last operation
// TODO if last value is not a number, dont execute
function eval() {
	// Don't eval if current opchain has been evaluated
	if(!/=/.test(opChain)) {
		let ops = opChain.split(" ");
		// Convert numbers in opchain to Numbers
		ops = ops.map(op => !isNaN(op) ? Number(op) : op);
		console.log(ops);

		// Do multiplication and division first
		while(ops.indexOf("x") >= 0 || ops.indexOf("÷") >= 0) {
			if(ops.indexOf("÷") < 0) { // just multiplication
				ops = multiply(ops);
			}
			else if(ops.indexOf("x") < 0) { // just division
				ops = divide(ops);
			}
			else if(ops.indexOf("x") < ops.indexOf("÷")) {  // multiplication left of division
				ops = multiply(ops);
			}
			else { // division left of multiplication
				ops = divide(ops);
			}
		}

		// Do addition and subtraction
		while(ops.indexOf("+") >= 0 || ops.indexOf("-") >= 0) {
			if(ops.indexOf("-") < 0) { // just addition
				ops = add(ops);
			}
			else if(ops.indexOf("+") < 0) { // just subtraction
				ops = subtract(ops);
			}
			else if(ops.indexOf("+") < ops.indexOf("÷")) {  // addition left of subtraction
				ops = add(ops);
			}
			else { // subtraction left of addition
				ops = subtract(ops);
			}
		}
		displayOutput(Number(ops[0].toFixed(5)).toString());
		// displayOpChain(Number(ops[0].toFixed(5)).toString());
		// 	displayOutput(Number(total.toFixed(5)).toString());
		// 	displayOpChain(Number(total.toFixed(5)).toString());
		// }
	}
}

// Perform leftmost multiplication operation
function multiply(ops) {
	const num1 = ops[ops.indexOf("x") - 1];
	const num2 = ops[ops.indexOf("x") + 1];
	const result = num1 * num2;
	console.log(num1, "x", num2, "=", result);
	ops.splice(ops.indexOf("x")-1, 3, result);
	return ops;
}

// Perform leftmost division operation
function divide(ops) {
	const num1 = ops[ops.indexOf("÷") - 1];
	const num2 = ops[ops.indexOf("÷") + 1];
	const result = num1 / num2;
	console.log(num1, "÷", num2, "=", result);
	ops.splice(ops.indexOf("÷")-1, 3, result);
	return ops
}

// Perform leftmost addition operation
function add(ops) {
	const num1 = ops[ops.indexOf("+") - 1];
	const num2 = ops[ops.indexOf("+") + 1];
	const result = num1 + num2;
	console.log(num1, "+", num2, "=", result);
	ops.splice(ops.indexOf("+")-1, 3, result);
	return ops;
}

// Perform leftmost subtraction operation
function subtract(ops) {
	const num1 = ops[ops.indexOf("-") - 1];
	const num2 = ops[ops.indexOf("-") + 1];
	const result = num1 - num2;
	console.log(num1, "-", num2, "=", result);
	ops.splice(ops.indexOf("-")-1, 3, result);
	return ops;
}