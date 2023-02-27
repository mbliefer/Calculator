const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const output = document.querySelector('.output');
const clear = document.querySelector('#clear');
let currentNum;
let previousNum;


const getNumber = (e) => {
    if (output.textContent == 0) output.textContent = "";
    output.textContent += e.target.value;
    currentNum = parseFloat(output.textContent);
};

const getOperatorKey = (e) => {
    if (!isNaN(e.key)) return
    if (e.key == "Enter") {
        e.preventDefault();
    }
    console.log(e.key);
    previousNum = currentNum;
    startNewNum();
}

const getOperatorClick = (e) => {
    console.log(e.target.id);
    previousNum = currentNum;
    startNewNum();
}

window.addEventListener('keydown', (e) => {
    if (e.key >= 0) {
        console.log(e.key);
        if (output.textContent == 0) output.textContent = "";
        output.textContent += e.key;
        currentNum = parseFloat(output.textContent);
    }
})

numbers.forEach((number) => {
    number.addEventListener('click', getNumber)
});

operators.forEach((operator) => {
    operator.addEventListener('click', getOperatorClick);
});

window.addEventListener('keydown', getOperatorKey);

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
    if (operator === "+") return add(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "*") return multiply(a, b);
    if (operator === "/") return divide(a, b);
};

function startNewNum() {
    output.textContent = 0;
    currentNum = output.textContent;
};

