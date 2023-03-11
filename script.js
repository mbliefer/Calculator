const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const negative = document.querySelector('#negative')
const buttons = document.querySelectorAll('.buttons');
const calculator = document.querySelector('.calculator');
let firstNum = '';
let secondNum = '';
let operation = '';
let previousOperation = '';
let total;
let shouldResetScreen = false;
let operatorClickedBeforeEquals = false;
let equalsClickedConsecutive = false;
let operatorIsSet = false;

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
    if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteBtn.click();
    }
}

const showSelectedOperator = (e) => {
    operators.forEach((operator) => {
        operator.classList.remove('activeOperator');
        if (operator.value === e.target.value) {
            operator.classList.add("activeOperator");
        }
    })
}

const removeSelectedOperator = () => {
    operators.forEach((operator) => {
        operator.classList.remove('activeOperator');
    })
}

const handleOperatorClick = (e) => {
    let operatorPlaceHolder = e.target.value;
    if(operatorIsSet) {
        operation = operatorPlaceHolder;
        return;
    }
    if (operation === '=') {
        firstNum = total;
        operation = '';
    }
    if (firstNum === '') {
        firstNum = secondNum;
    }
    if (operatorPlaceHolder === "=") {
        evaluateEquals(e);
        return;
    }
    if (operatorClickedBeforeEquals) {
        displayRunningTotal();
    }
    operation = e.target.value;
    shouldResetScreen = true;
    operatorClickedBeforeEquals = true;
    operatorIsSet = true;
}

function displayRunningTotal() {
    formatTotal();
    firstNum = total;
};

function evaluateEquals(e) {
    if (equalsClickedConsecutive) {
        firstNum = total;
        operation = previousOperation;
    }
    formatTotal();
    previousOperation = operation;
    operation = e.target.value;
    firstNum = '';
    shouldResetScreen = true;
    operatorClickedBeforeEquals = false;
    equalsClickedConsecutive = true;
    operatorIsSet = false;
}

function formatTotal() {
    total = operate(operation, firstNum, secondNum).toString();
    if (total.length > 9) {
        total = Number(total).toPrecision(8);
        if (total.includes('e')) {
            total = Number(total).toPrecision(6);
        }
    } 
    output.textContent = total;
    total = Number(total);
}

const makeNumberNegative = () => {
    if (shouldResetScreen) {
        shakeCalculator();
        return;
    }
    output.textContent = -output.textContent;
    secondNum = +output.textContent;
}

const clearCalculator = () => {
    output.textContent = 0;
    firstNum = '';
    secondNum = '';
    total = '';
    operation = '';
}

const deleteNumber = () => {
    if (shouldResetScreen) {
        shakeCalculator();
        return;
    }
    output.textContent = output.textContent.slice(0, output.textContent.length - 1);
    secondNum = +output.textContent;
}

function resetScreen() {
    output.textContent = '';
    shouldResetScreen = false;
}

function printNumber(number) {
    removeSelectedOperator();
    equalsClickedConsecutive = false;
    operatorIsSet = false;
    if (operation === '=') operation = '';
    if (output.textContent == 0 || shouldResetScreen) resetScreen();
    if (output.textContent.length < 9) {
        if (output.textContent.includes('.') && number === '.') {
            shakeCalculator();
            return;
        }
        output.textContent += number;
        secondNum = +output.textContent;
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
    this.classList.remove("active");
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    if (operator === "+") return add(a, b);
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
    operator.addEventListener('click', (e) => {
        showSelectedOperator(e);
        handleOperatorClick(e)
    });
});

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    handleKeyboardInput(e);
});
clear.addEventListener('click', clearCalculator);
deleteBtn.addEventListener('click', deleteNumber);
negative.addEventListener('click', makeNumberNegative);


