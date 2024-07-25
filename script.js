function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}

console.log(addition(5, 6));
console.log(subtraction(5, 6));
console.log(multiply(5, 6));
console.log(division(5, 6));

let firstNum;
let secondNum;
let operator;

function operate(num1, num2, sign) {
  switch (sign) {
    case "+":
      return addition(num1, num2);
      break;
    case "-":
      return subtraction(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return division(num1, num2);
      break;
  }
}

console.log(operate(10, 215, "*"));