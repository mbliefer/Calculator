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

//This calculator is designed to mimic the iphone calculator functionality
// enter number and display
// enter operator and display either 1st number or total until new number is entered

//Loop through keyboard input -> if it matches a button -> click()
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

//highlight the operator button currently seclected
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

//when operator is selected it is held in a placeHolder to screen -> 
//if another operator is selected before a number, operator is changed and
    //the screening process starts over before any calculation. ->
//if the placeHolder is '=', calculation will be made with previously selected operator ->
//if previously selected operation is '=' this means an operator was selected before a number
    //was selected, the firstNum will change to total so calculations can continue to be made.->
//if firstNum has no value this means only one number has been entered and no calculations can
    //be made yet. firstNum will be assigned the previously entered number. screen will be reset
    //when new number is typed to store the new secondNum. ->
//if 2 numbers have been entered but an operator is clicked before '=' it will string together
    //operations and show the running total.
const handleOperatorClick = (e) => {
    let operatorPlaceHolder = e.target.value;
    if(operatorIsSet) {
        operation = operatorPlaceHolder;
        return;
    }
    if (operatorPlaceHolder === "=") {
        evaluateEquals(e);
        return;
    }
    if (operation === '=') {
        firstNum = total;
        operation = '';
    }
    if (firstNum === '') {
        firstNum = secondNum;
    }
    if (operatorClickedBeforeEquals) {
        displayRunningTotal();
    }
    operation = e.target.value;
    shouldResetScreen = true;
    operatorClickedBeforeEquals = true;
    operatorIsSet = true;
}

//the display is designed to hold only 10 characters ->
//if calculation results in more characters the significant digits will be 
    //reduced to 8 to take into account '.' and '-'
function formatTotal() {
    total = operate(operation, firstNum, secondNum).toString();
    if (total.length > 9 && total.includes('.')) {
        if (total.includes('e')) {
            total = Number(total).toPrecision(5);
        } else {
        total = Number(total).toFixed(8);
        }
    }
     else if (total.length > 9) {
        total = Number(total).toPrecision(8);
        if (total.includes('e')) {
            total = Number(total).toPrecision(5);
        }
    } 
    output.textContent = total;
    total = Number(total);
}

function displayRunningTotal() {
    formatTotal();
    firstNum = total;
};

//if equals is selected consecutively, calculation will be made using previously 
    //selected operator and number combo. ie - 1 + 2 = 3 = 5 = 7 = 9
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

//makes a number negative, but do not want to allow user to change a calculated number to negative
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
    operatorClickedBeforeEquals = false;
}

const deleteNumber = () => {
    if (shouldResetScreen) {
        shakeCalculator();
        return;
    }
    output.textContent = output.textContent.slice(0, output.textContent.length - 1);
    secondNum = +output.textContent;
    console.log(secondNum);
}

function resetScreen() {
    output.textContent = '';
    shouldResetScreen = false;
}

//As soon as a number is selected the operator is un-highlighted
//only 9 characters are allowed to be printed, calculator shakes if more are attempted
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


