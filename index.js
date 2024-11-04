// DOM els
const calcDisplayContainer = document.querySelector('.calc-display-wrapper')
const calcDisplay = document.querySelector('.calc-display');

const calcBtnsContainer = document.querySelector('.calc-buttons');
const numBtns = document.querySelectorAll('.btn-num'); // All number buttons
const operationBtns = document.querySelectorAll('.btn-operation'); // All operation buttons

const btnDecimal = document.querySelector('.btn-decimal');
const btnEquals = document.querySelector('.btn-equals');
const btnDelete = document.querySelector('.btn-del');
const btnClear = document.querySelector('.btn-clear');

// State and value storage variables
let isDecimalUsed = false;
let isOperatorUsed = false;

let currentNum = ''; 
let previousNum = ''; 
let operator = '';
let result = ''; 

// Calculate and return result based on number and operator input
// Throws error for invalid inputs (non-numeric or division by zero)
function calculate (currNum, prevNum, op) {
    try {
        let curr = parseFloat(currNum);
        let prev = parseFloat(prevNum);
    
        if (isNaN(currNum) || isNaN(prevNum)) {
            throw new Error('Please enter a valid number')
        }
    
        switch (op) {
            case '+':
                return curr + prev;
    
            case '-':
                return prev - curr;
                
            case '*':
                return curr * prev;
    
            case '/':
                if (curr === 0 || prev === 0) {
                    updateDisplay('Nope');
                    throw new Error('Cannot divide by zero');
                }
                return prev / curr;
    
            default:
                throw new Error('Please enter a valid operator')
        }
    } catch (error){
        console.log(error.message)
        return null;
    }
}

// Append function argument to display 
function updateDisplay (val) {
    calcDisplay.textContent = val;
}

// Function to handle numeric input based on value of button clicked
// Prevent adding numbers after 0 with no decimal 
// If operator is used, start a new number
function handleNumericInput (numBtn) {
    if (
        currentNum.length === 1
        && currentNum == 0
        && !isDecimalUsed
    ) {
        return;
    } 

    if (isOperatorUsed) {
        currentNum = numBtn.textContent;
        isOperatorUsed = false;
    } else {
        currentNum += numBtn.textContent;
    }
}

// Function to handle operator input based on value of button clicked
// Prevent using operators without numeric input
function handleOperators (operBtn) {
    try {
        if (currentNum === '') return;

        if (previousNum !== '' && operator) {
            result = calculate(currentNum, previousNum, operator);
            updateDisplay(result);
            previousNum = result;
        } else {
            previousNum = parseFloat(currentNum);
        }

        operator = operBtn.textContent;

        isOperatorUsed = true;
        isDecimalUsed = false; // If we've used an operator, then a new number is being input and no decimal used
    } catch (error) {
        console.log(error.message)
        currentNum = previousNum = operator = result = ''; // Reset after error
    } 
}

// Event delegation for buttons container
// Perform appropriate handle function based on class of button clicked 
calcBtnsContainer.addEventListener('click', (event) => {
    let btnTarget = event.target;

    if (btnTarget.tagName !== 'BUTTON') return;

    if (btnTarget.classList.contains('btn-num')) {
        handleNumericInput(btnTarget);
        updateDisplay(currentNum);
    }

    if (btnTarget.classList.contains('btn-operation')) {
        handleOperators(btnTarget);
    }

})

// Calculate and display final result on button click
btnEquals.addEventListener('click', () => {
    if (currentNum === '' || previousNum === '' || operator === '') return;

    result = calculate(currentNum, previousNum, operator);
    updateDisplay(result);

    previousNum = ''; 
    currentNum = result; 
})

btnDelete.addEventListener('click', () => {
    // Reset boolean if decimal point has been deleted
    if (currentNum[currentNum.length - 1] === '.') {
        isDecimalUsed = false;
    }

    // Delete last digit of currentNum and update
    currentNum = currentNum.toString().slice(0, -1);
    updateDisplay(currentNum);
})

// Reset all values to default falsy and update display
btnClear.addEventListener('click', () => {
    isOperatorUsed = isDecimalUsed = false;
    currentNum = previousNum = operator = '';
    updateDisplay(currentNum) // Update display to be empty
})

// Add decimal point based on boolean and valid number value
btnDecimal.addEventListener('click', () => {
    if (!isDecimalUsed && currentNum !== '') {
        currentNum += '.'; 
        isDecimalUsed = true;

        updateDisplay(currentNum);
    } 
})


