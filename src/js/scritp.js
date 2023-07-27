const THEME_TOGGLE = document.querySelector("#theme-toggle")

let firstTerm
let secondTerm
let operator

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

THEME_TOGGLE.addEventListener("change", ({ target }) => {
  if (target.checked) {
    document.body.classList.add("dark")
    document.body.classList.remove("light")
  } else {
    document.body.classList.remove("dark")
    document.body.classList.add("light")
  }
})
