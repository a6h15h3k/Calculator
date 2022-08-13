let upperDisplay = document.querySelector("#display-top");
let lowerDisplay = document.querySelector("#display-bottom");
let buttons = Array.from(document.querySelectorAll(".button"));
let result = "", newNum, numPressed = false, canPressDecimal = false, canPressOperator = false, decimalCount =0;

setEventListeners(buttons);

function setEventListeners(buttons) {
    for (let button of buttons) {
        if (button.classList.contains('number')) {
            button.addEventListener('click', () => {
                numberPress(button);
            });
        } else if (button.classList.contains('operator')) {
            button.addEventListener('click', () => {
                operatorPress(button);
            });
        } else if (button.classList.contains('equals')) {
            button.addEventListener('click', () => {
                equalsPress(button);
            });
        } else if (button.classList.contains('clear')) {
            button.addEventListener('click', () => {
                clearPress(button);
            });
        } else if (button.classList.contains('decimal')) {
            button.addEventListener('click', () => {
                decimalPress(button);
            });
        } else if (button.classList.contains('power')) {
            button.addEventListener('click', () => {
                powerPress(button);
            });
        }
    }
}

function setUpperDisplay(item) {
    upperDisplay.textContent += item;
}

function displayResult() {
    lowerDisplay.textContent = result;
}

function operate(num1, num2, operator) { }

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function numberPress(button) {
    numPressed = true;
    canPressDecimal=true;
    setUpperDisplay(button.textContent);
}

function decimalPress(button) {
    if (canPressDecimal && decimalCount==0) {
        decimalCount++;
        setUpperDisplay(button.textContent);
        canPressDecimal = false;
    }
}

function operatorPress(button) {
    if (numPressed) {
        setUpperDisplay(button.textContent);
        numPressed = false;
        canPressDecimal = false;
        decimalCount=0;
    }
}

function equalsPress() {
    result = "result";
    displayResult();
}

function clearPress(button) {
    setUpperDisplay(button.textContent);
}

function powerPress(button) {
    setUpperDisplay(button.textContent);
}