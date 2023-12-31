const THEME_TOGGLE = document.querySelector("#theme-toggle")
const DISPLAY = document.querySelector(".result")
const DISPLAY_FIRST_TERM = document.getElementById("first_term")
const DISPLAY_OPERATION_SYMBOL = document.getElementById("operation_symbol")
const DISPLAY_SECOND_TERM = document.getElementById("second_term")
const DISPLAY_EQUALS = document.querySelector(".symbol.equals")
const NUMBERS = document.querySelectorAll(".number")
const DOT = document.querySelector(".dot")
const OPERATIONS = document.querySelectorAll(".operation")
const CLEAN = document.querySelector(".clean")
const EQUALS = document.querySelector(".button.equals")

let firstTerm
let secondTerm
let operation
let operationSymbol
let displayValue = "0"
let needNewCalc = false
let isDecimal = false

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, firstTerm, secondTerm) {
  return operator(firstTerm, secondTerm)
}

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark")
    document.body.classList.remove("light")
  } else if (theme === "light") {
    document.body.classList.add("light")
    document.body.classList.remove("dark")
  }
}

function updateDisplay() {
  if (!isDecimal && +displayValue % 1 !== 0) {
    displayValue = displayValue.toFixed(3)
    DOT.disabled = true
  }

  DISPLAY.textContent = displayValue
  DISPLAY_FIRST_TERM.textContent = firstTerm
  DISPLAY_SECOND_TERM.textContent = secondTerm
  DISPLAY_OPERATION_SYMBOL.textContent = operationSymbol

  DISPLAY.scroll(DISPLAY.scrollWidth, 0)
  DISPLAY_FIRST_TERM.parentNode.scroll(DISPLAY.scrollWidth, 0)

  if (needNewCalc) {
    DISPLAY_EQUALS.classList.remove("hidden")
  } else {
    DISPLAY_EQUALS.classList.add("hidden")
  }
}

function cleanDisplay() {
  firstTerm = ""
  secondTerm = ""
  operation = null
  operationSymbol = ""
  displayValue = "0"
  needNewCalc = false
  isDecimal = false

  updateDisplay()
}

function equals() {
  secondTerm = displayValue
  displayValue = operate(operation, +firstTerm, +displayValue)

  updateDisplay()
}

NUMBERS.forEach((number) => {
  number.addEventListener("click", ({ target }) => {
    if (needNewCalc) {
      cleanDisplay()
      DOT.disabled = false
    }

    const targetNumber = target.textContent

    if (displayValue === "0") {
      displayValue = targetNumber
    } else {
      displayValue += targetNumber
    }

    updateDisplay()
  })
})

DOT.addEventListener("click", () => {
  if (!isDecimal) {
    displayValue += "."
    isDecimal = true
    updateDisplay()
  }
})

OPERATIONS.forEach((operation_btn) => {
  operation_btn.addEventListener("click", ({ target }) => {
    const operationName = target.id

    if (!operation) {
      firstTerm = displayValue
    } else if (operation && displayValue !== "0") {
      equals()
      firstTerm = displayValue
      secondTerm = ""
    }

    switch (operationName) {
      case "add":
        operation = add
        break
      case "subtract":
        operation = subtract
        break
      case "multiply":
        operation = multiply
        break
      case "divide":
        operation = divide
        break
      case "multiplyMinus1":
        break
      case "divide100":
        break
    }

    operationSymbol = target.textContent

    displayValue = "0"
    isDecimal = false

    updateDisplay()
  })
})

CLEAN.addEventListener("click", () => {
  cleanDisplay()
})

EQUALS.addEventListener("click", () => {
  if (!operation) return

  needNewCalc = true
  equals()
})

THEME_TOGGLE.addEventListener("change", ({ target }) => {
  let theme = target.checked ? "dark" : "light"

  setTheme(theme)
  localStorage.setItem("theme", theme)
})

setTheme(localStorage.getItem("theme"))
