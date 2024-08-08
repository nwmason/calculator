function calculate() {

}

function errorMessage() {

}

function appendNumber(number) {
    workingResults.innerHTML += number
}

function appendOperation(operation) {
    const currentEquation = workingResults.textContent;
    if (isNaN(currentEquation.slice(-2))) {
        return
    } else {
        workingResults.innerHTML += " " + operation + " ";
    }
}

function clearData() {

}

const buttons = document.querySelectorAll(".calculator-button");
const workingResults = document.querySelector(".results-screen-typing");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {

        if (isNaN(event.target.id) === false) {
            appendNumber(event.target.id);

        } else if (event.target.id === "percent") {

        } else if (event.target.id === "decimal") {

        } else if (event.target.id === "all-clear" ) {

        } else if (event.target.id === "clear") {

        } else if (event.target.id === "equals") {
            calculate();

        } else {
            appendOperation(event.target.id);
        }
    });
}
