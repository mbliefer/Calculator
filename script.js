const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll(".buttons");
const calculator = document.querySelector(".calculator");
let firstNum = '';
let secondNum = '';
let operation = '';
let previousOperation = '';
let total;
let shouldResetScreen = false;
let operatorClickedBeforeEquals = false;
let equalsClickedConsecutive = false;

// enter number and display
// enter operator and display either 1st number or total until new number is entered
// 1st number is total OR 1st number(operand)second number is total

const handleKeyboardInput = (e) => {
    numbers.forEach((number) => {
        if (number.value === e.key) {
            number.click();
            number.classList.add("active");
            number.addEventListener('transitionend', removeTransition);
        };
    });
    operators.forEach((operator) => {
        if (operator.value === e.key || operator.id === e.key) {
            operator.click();
        }
    })
}

const handleOperatorClick = (e) => {
    let equalSignCheck = e.target.value;
    console.log(equalSignCheck);
    if (operation === '=') {
        firstNum = total;
        operation = '';
    }
    if (firstNum === '') {
        firstNum = secondNum;
        shouldResetScreen = true;
    }
    if (equalSignCheck === "=") {
        evaluateEquals(e);
        return;
    } 
    if (operatorClickedBeforeEquals) {
        displayRunningTotal();
        }
    operation = e.target.value;
    shouldResetScreen = true;
    operatorClickedBeforeEquals = true;
}

function evaluateEquals(equal) {
    if (equalsClickedConsecutive) {
        firstNum = total;
        operation = previousOperation;
    }
    total = operate(operation, firstNum, secondNum);
    previousOperation = operation;
    operation = equal.target.value;
    output.textContent = total;
    firstNum = '';
    shouldResetScreen = true;
    operatorClickedBeforeEquals = false;
    equalsClickedConsecutive = true;
    console.log(previousOperation);
    console.log(operation);
}

const clearCalculator = () => {
    output.textContent = 0;
    firstNum = '';
    secondNum = '';
    total = '';
    operation = '';
}

function resetScreen() {
    output.textContent = '';
    shouldResetScreen = false;
}

function displayRunningTotal() {
    total = operate(operation, firstNum, secondNum);
    output.textContent = total;
    firstNum = total;
    shouldResetScreen = true;
};

function printNumber(number) {
    equalsClickedConsecutive = false; 
    if (operation === '=') operation = '';
    if (output.textContent == 0 || shouldResetScreen) resetScreen();
    if (output.textContent.length < 9) {
        output.textContent += number;
        secondNum = parseFloat(output.textContent);
    }
    else {
        shakeCalculator();
    }
}

function shakeCalculator() {
    calculator.classList.add("shake");
    calculator.addEventListener('transitionend', () => {
        calculator.classList.remove("shake")
    });
}

function removeTransition() {
    console.log("active");
    this.classList.remove("active");
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    if (operator === "+") return(add(a, b));
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
};

// click a number on the calculator and add to display
numbers.forEach((number) => {
    number.addEventListener('click', () => printNumber(number.value));
});
// click on operator
operators.forEach((operator) => {
    operator.addEventListener('click', handleOperatorClick);
});

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    handleKeyboardInput(e);
});
clear.addEventListener('click', clearCalculator);


