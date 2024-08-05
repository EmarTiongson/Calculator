let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let isError = false; // Flag to indicate an error state

// Functions for basic operations
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
  if (b === 0) {
    alert("Invalid operation, cannot divid by zero.");
    isError = true; // Set error flag
    return "Error";
  }
  return a / b;
}

function percentage(a) {
  return a / 100;
}

function changeSign(a) {
  return a * -1;
}

// Function to perform the operation and round the result
function operate(operator, a, b) {
  if (isError) return "Error"; // Return error if flag is set

  a = parseFloat(a);
  b = parseFloat(b);
  let result;

  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      return null;
  }

  // Check if result is a number and round it, otherwise return result directly
  if (typeof result === "number") {
    return parseFloat(result.toFixed(10));
  } else {
    return result;
  }
}

// Variable to store the current display value
let displayValue = "0";

// Function to update the display
function updateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

// Flag to check if the next number is coming after an operator
let awaitingNextNumber = false;

// Add event listeners to number buttons and decimal point button
document.querySelectorAll(".button").forEach((button) => {
  if (!isNaN(button.textContent) || button.textContent === ".") {
    button.addEventListener("click", handleNumberClick);
  } else {
    button.addEventListener("click", handleOperatorClick);
  }
});

// Function to handle number and decimal point button clicks
function handleNumberClick(event) {
  const buttonValue = event.target.textContent;

  if (isError) {
    // Reset if there's an error and user starts new input
    displayValue = buttonValue;
    isError = false;
  } else {
    // If the displayValue is '0' or we are awaiting a new number after an operator, replace it
    if (displayValue === "0" || awaitingNextNumber) {
      displayValue = buttonValue;
      awaitingNextNumber = false; // Reset flag
    } else {
      // If a decimal point is clicked and already exists in the displayValue, do nothing
      if (buttonValue === "." && displayValue.includes(".")) return;
      displayValue += buttonValue; // Append number or decimal point to displayValue
    }
  }

  updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(event) {
  const buttonValue = event.target.textContent;

  if (buttonValue === "=") {
    if (currentOperator && !awaitingNextNumber) {
      secondNumber = displayValue;
      displayValue = operate(
        currentOperator,
        firstNumber,
        secondNumber
      ).toString();
      if (displayValue === "Error") {
        isError = true; // Set error flag if there's an error
      } else {
        firstNumber = displayValue;
      }
      currentOperator = "";
      awaitingNextNumber = true;
    }
  } else if (buttonValue === "C") {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    displayValue = "0";
    isError = false; // Reset error flag
  } else if (buttonValue === "←") {
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
    } else {
      displayValue = "0";
    }
  } else if (buttonValue === "+/-") {
    displayValue = changeSign(displayValue).toString();
  } else if (buttonValue === "%") {
    displayValue = percentage(displayValue).toString();
  } else {
    if (currentOperator && !awaitingNextNumber) {
      secondNumber = displayValue;
      displayValue = operate(
        currentOperator,
        firstNumber,
        secondNumber
      ).toString();
      if (displayValue === "Error") {
        isError = true; // Set error flag if there's an error
      } else {
        firstNumber = displayValue;
      }
    } else {
      firstNumber = displayValue;
    }
    currentOperator =
      buttonValue === "×" ? "*" : buttonValue === "÷" ? "/" : buttonValue;
    awaitingNextNumber = true;
  }

  // Format the display value to avoid overflow if there's no error
  if (!isError) {
    displayValue = parseFloat(displayValue)
      .toFixed(10)
      .replace(/\.?0+$/, "");
  }

  updateDisplay();
}

// Initial display update
updateDisplay();
