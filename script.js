const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll(".buttons");
const calculator = document.querySelector(".calculator");
let firstNum = '';
let secondNum = '';
let operation = '';
let total;
let shouldResetScreen = false;
let operatorClickedBeforeEquals = false;

// enter number and display
// enter operator and display either 1st number or total until new number is entered
// 1st number is total OR 1st number(operand)second number is total

const handleNumberKey = (e) => {
    numbers.forEach((number) => {
        if (number.value === e.key) {
            number.click();
            number.classList.add("active");
            number.addEventListener('transitionend', removeTransition);
        };
    });
    operators.forEach((operator) => {
        if (operator.value === e.key) {
            operator.click();
        }
    })
}

const handleOperatorClick = (e) => {
    let evaluate = e.target.value;
    if (operation === '=') {
        console.log("=");
        firstNum = total;
        operation = '';
    }
    if (firstNum === '') {
        firstNum = secondNum;
        shouldResetScreen = true;
    }
    if (evaluate === "=") {
        e.preventDefault();
        total = operate(operation, firstNum, secondNum);
        operation = e.target.value;
        evaluateEquals();
        return;
    } 
    // if (firstNum !== '' && operation !== '') {
    // total = operate(operation, firstNum, secondNum);
    // displayRunningTotal();
    // }
    if (operatorClickedBeforeEquals) {
        total = operate(operation, firstNum, secondNum);
        displayRunningTotal();
        }
    operation = e.target.value;
    shouldResetScreen = true;
    operatorClickedBeforeEquals = true;
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
    output.textContent = total;
    firstNum = total;
    shouldResetScreen = true;
};

function evaluateEquals() {
    output.textContent = total;
    firstNum = '';
    shouldResetScreen = true;
    operatorClickedBeforeEquals = false;
}

function printNumber(number) {
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
    handleNumberKey(e);
    // handleOperatorKey(e);
});

clear.addEventListener('click', clearCalculator);


