const display = document.querySelector(".display");

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

function operate(operator, a, b) {
    a = +a;
    b = +b;
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return Math.floor(result*1000)/1000;
}



let a = "";
let b = "";
let operator = "";
let operatorClicked = false;
let equalLocked = true;

// Add Event listeners to the buttons
// Save the first number in a 
// After the operator was clicked save the number in b
let numbers = document.querySelectorAll(".number");
numbers.forEach(num => {
    num.addEventListener("click", () => {
        if (!operatorClicked) {
            a += num.textContent;
            display.textContent = a;
        } else {
            b += num.textContent;
            display.textContent = b;
            // If b was typed in we can unlock equals
            equalLocked = false;
        }
    })
})

// When an operator is clicked save a and the operator
let operators = document.querySelectorAll(".operator");
operators.forEach(currentOperator => {
    currentOperator.addEventListener("click", () => {
        if (!operatorClicked) {
            // Save display value to a, in case this happens after the equal button was clicked
            a = display.textContent;
            operator = currentOperator.textContent;
            operatorClicked = true;
        } else {
            // If the operator was clicked already it should function like equal 
            equals();
            a = display.textContent;
            operator = currentOperator.textContent;
            operatorClicked = true;
        }
    });
})

// When = clicked calculate with the appropriate method
let equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    equals();
})

function equals() {
    // Check if number b was typed in otherwise equal stays locked
    if(!equalLocked){
        // Save display value to b
        b = display.textContent;
        display.textContent = operate(operator, a, b);
        init();
        equalLocked = true;
    }
}

// When Clear is clicked all is reset
let clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    init();
    display.textContent = "0";
})

function init() {
    a = "";
    b = "";
    operator = "";
    operatorClicked = false;
}