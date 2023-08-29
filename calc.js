let operator;
let num1;
let num2;
let displayValue = '';
let checkValue = '';
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        default:
            return divide(num1, num2);
    }
}

const nums = document.querySelectorAll('.num');
const display = document.getElementById('displayVal');
const clear = document.querySelector('.clear');
const operations = document.querySelectorAll('.op');
const equal = document.getElementById('equals');
const res = document.getElementById('result');
const dec = document.getElementById('decimal');
const ops = ['+', '-', '÷', '×'];

nums.forEach((num) => {
    num.addEventListener('click', () => {
        checkValue += num.value;
        if (parseInt(checkValue) !== 0 || checkValue[0] === '0' && checkValue.length === 1) {
            displayValue += num.value;
        }
        display.textContent = displayValue;
    });
});

clear.addEventListener('click', () => {
    displayValue = '';
    checkValue = '';
    display.textContent = displayValue;
    res.textContent = 0;
})

operations.forEach((op) => {
    op.addEventListener('click', () => {
        if (displayValue.length === 0) {
            return; // Avoid starting with an operator
        }
        const lastChar = displayValue.trim().slice(-1);
        if (ops.includes(lastChar)) {
            displayValue = displayValue.slice(0, displayValue.length - 3) + ' ' + op.value + ' ';
        }
        else {
            if (displayValue.split(' ').length === 3) {
                const arr = displayValue.split(' ');
                displayValue = operate(parseFloat(arr[0]), parseFloat(arr[2]), arr[1]).toFixed(3);
                res.textContent = displayValue;
            }
            displayValue += ' ' + op.value + ' ';
        }
        checkValue = '';
        display.textContent = displayValue;
    });
});

equal.addEventListener('click', () => {
    const arr = displayValue.split(' ');
    res.textContent = operate(parseFloat(arr[0]), parseFloat(arr[2]), arr[1]).toFixed(3);
    displayValue = res.textContent;
    checkValue = res.textContent;
});

dec.addEventListener('click', () => {
    const lastChar = displayValue.trim().slice(-1);
    if(!(checkValue.includes('.')) && !(ops.includes(lastChar)) && lastChar !== '.'){
        displayValue += '.';
        display.textContent = displayValue;
    }
});
