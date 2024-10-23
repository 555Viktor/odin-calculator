// Display DOM els
const calcDisplayContainer = document.querySelector('.calc-display-wrapper');
const calcDisplay = document.querySelector('.calc-display');
calcDisplay.textContent = 0; //Default display value

// Node-lists for all button types
const calcAllBtns = document.querySelectorAll('.btn-calc');
const calcNumBtns = document.querySelectorAll('.btn-num');
const calcOperationBtns = document.querySelectorAll('.btn-operation');

// DOM calc operation buttons
const btnDel = document.querySelector('.btn-del');
const btnClear = document.querySelector('.btn-clear');
const btnEquals = document.querySelector('.btn-equals');

// Append to display functions

function appendToDisplay (n) {
    calcDisplay.textContent = n;
}

function clearDisplay () {
    calcDisplay.textContent = 0;
}

calcNumBtns.forEach(btnNum => {
    btnNum.addEventListener('click', () => {
        appendToDisplay(btnNum.textContent);
    });
});

btnClear.addEventListener('click', () => {
   clearDisplay() 
})