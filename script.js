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
            if(b === 0){
                return result = "Can't divide by 0";
            } else {
                result = divide(a, b);
                break;
            }
    }
    return Math.floor(result*1000)/1000;
}



let a = "";
let b = "";
let operator = "";
let operatorClicked = false;
let equalLocked = true;

// Add Event listeners to the NUMBER BUTTONS
// Save the first number in a 
// After the operator was clicked save the number in b
let numbers = document.querySelectorAll(".number");
numbers.forEach(num => {
    num.addEventListener("click", () => {
        saveInput(num.textContent);
    })
})

function saveInput(input){
    console.log("click");
    if (!operatorClicked) {
        a += input;
        display.textContent = a;
    } else {
        b += input;
        display.textContent = b;
        // If b was typed in we can unlock equals
        equalLocked = false;
    }
}


// When an operator is clicked save a and the OPERATOR BUTTONS
let operators = document.querySelectorAll(".operator");
operators.forEach(currentOperator => {
    currentOperator.addEventListener("click", () => {
        saveOperator(currentOperator.textContent);
    });
})

function saveOperator(input){
    if (!operatorClicked) {
        operator = input;
        operatorClicked = true;
    } else {
        // If the operator was clicked already it should function like equal 
        equals();
        operator = input;
        operatorClicked = true;
    }
}



// When EQUAL clicked calculate with the appropriate method
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
        a = display.textContent;
    }
}

// When CLEAR is clicked all is reset
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
    equalLocked = true;
}

// DOT button event handler
const dot = document.querySelector(".dot");
dot.addEventListener("click", () => {
    if (!operatorClicked) {
        if(!(a.includes("."))){
            a += ".";
            display.textContent = a;
        }
    } else {
        if(!(b.includes("."))){
            b += ".";
            display.textContent = b;
        }
    }
})

// Add BACKSPACE event handler
const back = document.querySelector(".back");
back.addEventListener("click", () => {
    if(!operatorClicked){
        a = a.slice(0, a.length-1);
        display.textContent = a;
    } else {
        b = b.slice(0, b.length - 1);
        display.textContent = b;
    }
})

// KEYBOARD support
document.addEventListener("keypress", (e) => {
    if(/^[0-9]/.test(e.key)){
        saveInput(e.key);
    } else if(/^[-+*\/]/.test(e.key)){
        saveOperator(e.key);
    } else if(e.key === "Enter"){
        equals();
    } else if(e.key === "c"){
        init();
        display.textContent = "0";
    }
})