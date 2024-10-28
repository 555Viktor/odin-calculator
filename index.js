// DOM elements
const calcDisplayContainer = document.querySelector('.calc-display-wrapper')
const calcDisplay = document.querySelector('.calc-display');

const numBtns = document.querySelectorAll('.btn-num');
const operationBtns = document.querySelectorAll('.btn-operation');

const btnDecimal = document.querySelector('.btn-decimal');
const btnEquals = document.querySelector('.btn-equals');
const btnDelete = document.querySelector('.btn-del');
const btnClear = document.querySelector('.btn-clear');

let currentNum = '';
let previousNum = '';
let operator = '';
let result = '';

let isOperatorUsed = false;

function calculate (currNum, prevNum, op) {
    let curr = parseFloat(currNum);
    let prev = parseFloat(prevNum);

    if (isNaN(currNum) || isNaN(prevNum)){
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
            if (prevNum == '0') return 'Error'
            return curr / prev;

        default:
            return 'Error'
    }

}

function updateDisplay (num) {
    calcDisplay.textContent = num;
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

