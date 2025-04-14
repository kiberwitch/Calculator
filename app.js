const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.value = currentInput;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
  }
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    currentInput = "0.";
    waitingForSecondOperand = false;
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    currentInput = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "×":
      return firstOperand * secondOperand;
    case "÷":
      return firstOperand / secondOperand;
    case "%":
      return firstOperand % secondOperand;
    default:
      return secondOperand;
  }
}

function resetCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
}

function inputPercent() {
  currentInput = (parseFloat(currentInput) / 100).toString();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
      case "AC":
        resetCalculator();
        break;
      case "+/-":
        toggleSign();
        break;
      case "%":
        inputPercent();
        break;
      case ".":
        inputDecimal();
        break;
      case "=":
        if (operator && !waitingForSecondOperand) {
          handleOperator(value);
          operator = null;
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        handleOperator(value);
        break;
      default:
        inputDigit(value);
    }

    updateDisplay();
  });
});
updateDisplay();
