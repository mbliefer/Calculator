const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll(".buttons");
const calculator = document.querySelector(".calculator");
let firstNum = '';
let secondNum = '';
let operation;
let total;
let shouldResetScreen = false;

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

    // operators.forEach((operator) => {
    //     if (operator.value == e.key) {
    //         console.log(operator.id)
    //         console.log(operation);
    //         operate(operation, firstNum, secondNum);
    //     };
    // });

const handleOperatorKey = (e) => {
    if (firstNum === '') {
        firstNum = secondNum;
        shouldResetScreen = true;
        console.log(operation);
        operation = e.key;
    }
    if (operation === "Enter" || operation === "=") {
        e.preventDefault();
        operate(operation, total, firstNum);
    } else {
        console.log(operation)
        total = operate(operation, firstNum, secondNum);
        displayNewNum();    
    }
    operators.forEach((operator) => {
            if (operator.value == e.key && firstNum != '') {
                operation = e.key;
                console.log(operation);
            };
        });
}

const handleOperatorClick = (e) => {
    if (firstNum === '') {
        firstNum = secondNum;
        shouldResetScreen = true;
        console.log(operation);
    }
    if (operation === "Enter" || operation === "=") {
        e.preventDefault();
        total = operate(operation, firstNum, secondNum);
        displayNewNum();
        return;
    } else {
    total = operate(operation, firstNum, secondNum);
    displayNewNum();
    }
    operation = e.target.value;
    console.log(operation);
}

const clearCalculator = () => {
    output.textContent = 0;
    firstNum = 0;
    total = 0;
}


function resetScreen() {
    output.textContent = "";
    shouldResetScreen = false;
}

function displayNewNum() {
    output.textContent = total;
    firstNum = total;
    shouldResetScreen = true;
};

function printNumber(number) {
    if (output.textContent == 0 || shouldResetScreen) resetScreen();
    if (output.textContent.length < 9) {
        output.textContent += number;
        secondNum = parseFloat(output.textContent);
    }
    else {
        calculator.classList.add("shake");
        removeShake();
    }
}

function removeShake() {
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


