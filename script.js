const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll(".buttons");
const calculator = document.querySelector(".calculator");
let num;
let operation;
let total;

// enter number and display
// enter operator and display either 1st number or total until new number is entered
// 1st number is total OR 1st number(operand)second number is total

const getNumberKey = (e) => {
    numbers.forEach((number) => {
        if (number.value === e.key) {
            number.click();
            number.classList.add("active");
            number.addEventListener('transitionend', removeTransition);
        };
    });
}

const getOperatorKey = (e) => {
    operation = e.key;
    total = num;
    operators.forEach((operator) => {
        if (operator.value == e.key) {
            console.log(operator.id)
            console.log(operator.value);
        };
    });
    if (operation == "/" || operation == "*" || operation == "-" || operation == "+") {
        console.log(operation);
        total = num;
    }
    if (operation == "Enter") {
        e.preventDefault();
        operate(operation, total, num);
    } else {
        return;
    }
}

const getOperatorClick = (e) => {
    console.log(e.target.id);

    startNewNum();
}

const clearCalculator = () => {
    output.textContent = 0;
    num = 0;
    total = 0;
}

function printNumber(number) {
    if (output.textContent == 0) output.textContent = "";
    if (output.textContent.length < 9) {
        output.textContent += number;
        num = parseFloat(output.textContent);
    }
    else {
        console.log("hi");
        console.log(calculator.outerHTML);
        calculator.classList.add("shake");
        calculator.addEventListener('transitionend', () => {
            calculator.classList.remove("shake")
        });
    }
}

function removeTransition() {
    this.classList.remove("active");
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    if (operator === "+") console.log(add(a, b));
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
};

function startNewNum() {
    output.textContent = 0;
    num = output.textContent;
};

function getTotal() {

}

// click a number on the calculator and add to display
numbers.forEach((number) => {
    number.addEventListener('click', () => printNumber(number.value))
});
// click on operator
operators.forEach((operator) => {
    operator.addEventListener('click', getOperatorClick);
});

window.addEventListener('keydown', (e) => {
    getNumberKey(e);
    getOperatorKey(e);
});

clear.addEventListener('click', clearCalculator);


