let upperDisplay = document.querySelector("#display-top");
let lowerDisplay = document.querySelector("#display-bottom");
let buttons = Array.from(document.querySelectorAll(".button"));
let result, equation = "", operand = "", currentOperator = "", nextOperator = "", numPressed = false, canPressDecimal = false, canPressOperator = false, decimalCount = 0, justInitialized = true, powerOn = true;

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

function addToUpperDisplay(item) {
    equation += item;
    upperDisplay.textContent = equation;
}

function setUpperDisplay(item) {
    upperDisplay.textContent = item;
}

function setLowerDisplay(item) {
    if (isNaN(item) && !justInitialized)
        lowerDisplay.textContent = "Ah-ah-ah!";
    else if (justInitialized)
        lowerDisplay.textContent = "";
    else
        lowerDisplay.textContent = item;
}

function displayResult() {
    if (result != null)
        setLowerDisplay(result);
    else
        setLowerDisplay(parseFloat(operand));
}

function calculate() {
    switch (currentOperator) {
        case "+":
            return (add(result, parseFloat(operand)));
        case "-":
            return (subtract(result, parseFloat(operand)));
        case "*":
            return (multiply(result, parseFloat(operand)));
        case "/":
            return (divide(result, parseFloat(operand)));
    }
}

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
    if (powerOn) {
        numPressed = true;
        canPressDecimal = true;
        canPressOperator = true;
        justInitialized = false;
        operand += button.textContent;
        equalsPress();
        addToUpperDisplay(button.textContent);
    }
}

function decimalPress(button) {
    if (canPressDecimal && decimalCount == 0) {
        decimalCount++;
        addToUpperDisplay(button.textContent);
        canPressDecimal = false;
        canPressOperator = false;
        operand += button.textContent;
    }
}

function operatorPress(button) {
    if (canPressOperator) {
        addToUpperDisplay(button.textContent);
        numPressed = false;
        canPressDecimal = false;
        canPressOperator = false;
        decimalCount = 0;
        nextOperator = button.textContent;

        if (result != null)
            result = calculate();
        else
            result = parseFloat(operand);

        currentOperator = nextOperator;
        operand = "";
        displayResult();
    }
}

function equalsPress() {
    if (powerOn) {
        if (result != null)
            setLowerDisplay(calculate());
        else
            setLowerDisplay(parseFloat(operand));
    }
}

function clearPress() {
    setUpperDisplay("");
    setLowerDisplay("");
    result = null;
    equation = "";
    operand = "", numPressed = false, canPressDecimal = false, canPressOperator = false, decimalCount = 0, justInitialized = true;
}

function powerPress() {
    if (powerOn)
        powerOn = false;
    else {
        powerOn = true;
        powerOnAnimation("Power ON");
    }
    clearPress();
}