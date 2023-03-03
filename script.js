const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll(".buttons");
let currentNum;
let previousNum;
let operator;

const getNumber = (e) => {
    if (output.textContent == 0) output.textContent = "";
    output.textContent += e.target.value;
    currentNum = parseFloat(output.textContent);
};

const getOperatorKey = (e) => {
    if (!isNaN(e.key)) return
    if (e.key == "Enter") {
        e.preventDefault();
        operate("+", previousNum, currentNum);
    }
    operator = e.key;
    previousNum = currentNum;
    startNewNum();
}

const getOperatorClick = (e) => {
    console.log(e.target.id);
    previousNum = currentNum;
    startNewNum();
}

function removeTransition(e) {
    this.classList.remove("active");
}

// window.addEventListener('keydown', (e) => {
//     if (e.key >= 0) {
//         console.log(e.key);
//         if (output.textContent == 0) output.textContent = "";
//         output.textContent += e.key;
//         currentNum = parseFloat(output.textContent);
//     }
// })

// click a number on the calculator and add to display
numbers.forEach((number) => {
    number.addEventListener('click', getNumber)
});
// click on operator
operators.forEach((operator) => {
    operator.addEventListener('click', getOperatorClick);
});

window.addEventListener('keydown', getOperatorKey);

window.addEventListener('keydown', (e) => {
    let key = e.key;
    numbers.forEach((number) => {
        if (number.value == key) {
            number.classList.add("active");
            number.click();
            number.addEventListener('transitionend', removeTransition);
        };
    });
    operators.forEach((operator) => {
        if (operator.value == key) {
            console.log(operator.id);
        };
    });
});



clear.addEventListener('click', () => {
    output.textContent = 0;
    currentNum = output.textContent;
    previousNum = currentNum;
});

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
    currentNum = output.textContent;
};


