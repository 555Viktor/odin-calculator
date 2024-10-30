// DOM Els
const calcDisplayContainer = document.querySelector('.calc-display-wrapper')
const calcDisplay = document.querySelector('.calc-display');

const numBtns = document.querySelectorAll('.btn-num'); // All number buttons
const operationBtns = document.querySelectorAll('.btn-operation'); // All operation buttons

const btnDecimal = document.querySelector('.btn-decimal');
const btnEquals = document.querySelector('.btn-equals');
const btnDelete = document.querySelector('.btn-del');
const btnClear = document.querySelector('.btn-clear');

let isDecimalUsed = false;
let isOperatorUsed = false;

let currentNum = ''; // current number input
let previousNum = ''; // last number value before an operator is clicked
let operator = ''; // operator in use
let result = ''; // result after calculation() is invoked with proper parameters


// Perform calculation
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
                return curr - prev;
                
            case '*':
                return curr * prev;
    
            case '/':
                if (prev === 0) throw new Error('Cannot divide by zero')
                return curr / prev;
    
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

// Number input functionality for each numBtn from node list
numBtns.forEach(numBtn => {
    numBtn.addEventListener('click', () => {
        if (
            currentNum.length >! 1 // If current num is no more than 1 digit
            && currentNum == 0 // Current display number is 0
            && !isDecimalUsed // No decimal used
        ) {
            return; // Prevent adding multiple numbers after 0 with no decimal
        } 
        
        //  Manage value of currentNum depending if user has used an operator
        if (isOperatorUsed) {
            currentNum = numBtn.textContent;
            isOperatorUsed = false;
        } else {
            currentNum += numBtn.textContent;
        }

        updateDisplay(currentNum);
    })
})


// Operation functionality
operationBtns.forEach(operBtn => {
    operBtn.addEventListener('click', () => {
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
            isDecimalUsed = false; //If we've used an operator, then a new number is being input and no decimal used
        } catch (error) {
            console.log(error.message)
            currentNum = previousNum = operator = result = ''; // Reset after error
        }
    })
})

btnEquals.addEventListener('click', () => {
    if (currentNum === '' || previousNum === '' || operator === '') return;

    result = calculate(currentNum, previousNum, operator)
    updateDisplay(result);

    previousNum = ''; 
    currentNum = result; 
})

btnDelete.addEventListener('click', () => {
    // Reset bool if decimal has been deleted from current input
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


btnDecimal.addEventListener('click', () => {
    if (!isDecimalUsed && currentNum !== '') {
        currentNum += '.'; 
        isDecimalUsed = true;

        updateDisplay(currentNum);
    } 
})