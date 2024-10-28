// Calculator display DOM els
const calcDisplay = document.querySelector('.calc-display');
calcDisplay.textContent = 0; //Default display value

// Node-lists for all button types
const calcAllBtns = document.querySelectorAll('.btn-calc');
const calcNumBtns = document.querySelectorAll('.btn-num');
const calcOperationBtns = document.querySelectorAll('.btn-operation'); // Add, substract, multiply, divide

const btnDel = document.querySelector('.btn-del');
const btnClear = document.querySelector('.btn-clear');
const btnEquals = document.querySelector('.btn-equals');

let currentNum = '';
let previousNum = '';
let operand = '';

// Calc functions

// Append to display functions
// Parameter takes the value to be appended

function appendToDisplay (n) {
    if (calcDisplay.textContent == 0) calcDisplay.textContent = n;
    else    calcDisplay.textContent += n;
}

function clearDisplay () {
    calcDisplay.textContent = 0;
}

function deleteLastNum () {
    // Do not delete if display content is only equal to 0
    if(calcDisplay.textContent == 0) return

    calcDisplay.textContent = calcDisplay.textContent.slice(0, -1);
    
    // If after deleting text content will be empty, set it's value to 0;
    if(calcDisplay.textContent.length === 0) calcDisplay.textContent = 0;
}

// Button event listeners
// Make each button of the node list append it's textContent to display when clicked
calcNumBtns.forEach(btnNum => {
    btnNum.addEventListener('click', () => {
        appendToDisplay(btnNum.textContent);
    })
})

btnDel.addEventListener('click', () => deleteLastNum());
btnClear.addEventListener('click', () => clearDisplay());
