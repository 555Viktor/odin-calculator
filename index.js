// DOM Els
const calcDisplayContainer = document.querySelector('.calc-display-wrapper')
const calcDisplay = document.querySelector('.calc-display');

const numBtns = document.querySelectorAll('.btn-num');
const operationBtns = document.querySelectorAll('.btn-operation');

const btnDecimal = document.querySelector('.btn-decimal');
const btnEquals = document.querySelector('.btn-equals');
const btnDelete = document.querySelector('.btn-del');
const btnClear = document.querySelector('.btn-clear');

let isDecimalUsed = false;
let isOperatorUsed = false;

let currentNum = '';
let previousNum = ''; // last number entered before an operator was clicked.
let operator = '';
let result = '';

function calculate (currNum, prevNum, op) {
    let curr = parseFloat(currNum);
    let prev = parseFloat(prevNum);

    if (isNaN(currNum) || isNaN(prevNum)) {
        return 'Error';
    }

    switch (op) {
        case '+':
            return curr + prev;

        case '-':
            return curr - prev;
            
        case '*':
            return curr * prev;

        case '/':
            if (prev === 0) return 'Error'
            return curr / prev;

        default:
            return 'Error'
    }

}

function updateDisplay (val) {
    calcDisplay.textContent = val;
}

numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', () => {
        if (isOperatorUsed) {
            currentNum = numBtn.textContent;
            isOperatorUsed = false;
        } else {
            currentNum += numBtn.textContent;
        }

        updateDisplay(currentNum);
    })
})


operationBtns.forEach(operBtn => {
    operBtn.addEventListener('click', () => {
        if (currentNum === '') return 'Error';

        if (previousNum !== '' && operator) {
            result = calculate(currentNum, previousNum, operator);
            updateDisplay(result);
            previousNum = result;
        } else {
            previousNum = parseFloat(currentNum);
        }

        operator = operBtn.textContent;
        isOperatorUsed = true;
    })
})

btnEquals.addEventListener('click', () => {

    if (currentNum === '' || previousNum === '' || operator === '') return;

    result = calculate(currentNum, previousNum, operator)
    updateDisplay(result);

    previousNum = ''; 
    currentNum = result; 
})

btnClear.addEventListener('click', () => {
    isOperatorUsed = false;
    currentNum = previousNum = operator = '';

    updateDisplay(currentNum) // Update display to be empty
})

btnDelete.addEventListener('click', () => {
    currentNum = currentNum.slice(0, -1);
    updateDisplay(currentNum);
})

btnDecimal.addEventListener('click', () => {

    

})