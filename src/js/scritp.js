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

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark")
    document.body.classList.remove("light")
  } else if (theme === "light") {
    document.body.classList.add("light")
    document.body.classList.remove("dark")
  }
}

THEME_TOGGLE.addEventListener("change", ({ target }) => {
  let theme = target.checked ? "dark" : "light"

  setTheme(theme)
  localStorage.setItem("theme", theme)
})

setTheme(localStorage.getItem("theme"))
