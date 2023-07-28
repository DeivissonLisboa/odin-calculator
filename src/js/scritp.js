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

function setTheme(IsChecked) {
  if (IsChecked) {
    document.body.classList.add("dark")
    document.body.classList.remove("ligth")
  } else {
    document.body.classList.add("ligth")
    document.body.classList.remove("dark")
  }
}

THEME_TOGGLE.addEventListener("change", ({ target }) => {
  console.log(target.checked)
  setTheme(target.checked)

  localStorage.setItem("theme", target.checked)
})

setTheme(localStorage.getItem("theme"))
