function calculate() {

}

function errorMessage(error) {
    finalResults.textContent = error
    const clear = document.querySelector("#all-clear")

    clear.addEventListener("click", () => {
        finalResults.textContent = ""
    })
}

function appendNumber(number) {
    if (workingResults.textContent.length > 35) {
        errorMessage("ERROR: SCREEN OVERFLOW");
    } else {
        workingResults.textContent += number;
    }
}

function appendOperation(operation) {
    const currentEquation = workingResults.textContent;
    if (isNaN(currentEquation.slice(-2))
    && currentEquation.slice(-1) !== "%") {
        return
    } else if (currentEquation.length === 0
        || currentEquation.slice(-1) === ".") {
        return
    } else {
        workingResults.innerHTML += " " + operation + " ";
        decimalCount = 0
        percentCount = 0
    }
}

function appendDecimal() {
    const currentEquation = workingResults.textContent;

    if (decimalCount === 0 && percentCount === 0) {
        if (isNaN(currentEquation.slice(-2))) {
            workingResults.textContent += "0.";
            decimalCount++;

        } else if (currentEquation.length === 0) {
            workingResults.textContent += "0.";
            decimalCount++;

        } else {
            workingResults.textContent += ".";
            decimalCount++;
        }
    } else {
        return
    }
}

function appendPercent() {
    const currentEquation = workingResults.textContent;

    if (percentCount === 0 && decimalCount === 0) {
        if (isNaN(currentEquation.slice(-2)) 
            || isNaN(currentEquation.slice(-1)) ) {
        } else if (currentEquation.length !== 0){
            workingResults.textContent += "%";
            percentCount++;
        }
    }
}

function clearData(clearMethod) {
    const currentEquation = workingResults.textContent;

    if (clearMethod === 'c') {
        if (isNaN(currentEquation.slice(-2))
        && currentEquation.slice(-1) !== "%"
        && currentEquation.slice(-1) !== ".") {
            workingResults.textContent = currentEquation.slice(0,-3);
        } else if (currentEquation.slice(-1) === "%"
                    || currentEquation.slice(-1) === ".") {
            workingResults.textContent = currentEquation.slice(0, -1);
            percentCount = 0;
            decimalCount = 0;
        } else {
            workingResults.textContent = currentEquation.slice(0, -1);
        }
    } else {
        workingResults.textContent = ""
        percentCount = 0;
        decimalCount = 0;
    }
}

const buttons = document.querySelectorAll(".calculator-button");
const workingResults = document.querySelector(".results-screen-typing");
const finalResults = document.querySelector(".results-screen-result");
let decimalCount = 0
let percentCount = 0

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {

        if (isNaN(event.target.id) === false) {
            appendNumber(event.target.id);

        } else if (event.target.id === "percent") {
            appendPercent();

        } else if (event.target.id === ".") {
            appendDecimal();

        } else if (event.target.id === "all-clear" ) {
            clearData('ac')

        } else if (event.target.id === "clear") {
            clearData('c')

        } else if (event.target.id === "equals") {
            calculate();

        } else {
            appendOperation(event.target.id);
        }
    });
}