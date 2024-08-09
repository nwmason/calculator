function equaltsTo() {
    if (workingResults.textContent.length === 0) {
        return
    } else if (workingResults.textContent.slice(-1) === "%") {
        calculate();
    } else if (isNaN(workingResults.textContent.slice(-2))
            || workingResults.textContent.slice(-1) === ".") {
        errorMessage("ERROR: UNFINISHED");
    } else {
        calculate();
    }
}

function calculate() {
    let splitEquation = workingResults.textContent.split(" ");
    let num1 = splitEquation[0]
    let num2 = splitEquation[2]

    if (num1 !== undefined && num2 !== undefined) {
        console.log(num1.slice(0,-2))
        if (num1.slice(-1) === "%") {
            num1 = parseFloat(num1.slice(0, -1) / 100)
            console.log(num1)
        }
        if (num2.slice(-1) === "%") {
            num2 = parseFloat(num2.slice(0, -1)) / 100
        }
    }

    switch(splitEquation[1]) {
        case '+':
            console.log("addition");
            result = parseFloat(num1) + parseFloat(num2)
            break;
        case '-':
            console.log("subtraction");
            result = parseFloat(num1) - parseFloat(num2)
            break;
        case 'x':
            console.log("multiplication");
            result = parseFloat(num1) * parseFloat(num2)
            break;
        case '÷':
            console.log("division");
            result = parseFloat(num1) / parseFloat(num2)
            break;
        default:
            result = workingResults.textContent
    }
    finalResults.textContent = result;
    resultsShown = 1
    operationCount = 0
    decimalCount = 0
    percentCount = 0

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
        errorMessage("ERROR: OVERFLOW");
        operationCount = 1;
        decimalCount = 1;
        percentCount = 1;
    } else if(percentCount === 1) {
    } else if(resultsShown === 1) {
        workingResults.textContent = "";
        finalResults.textContent = "";
        num1 = 0
        num2 = 0
        resultsShown = 0

        workingResults.textContent += number;
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
    } else if (operationCount === 1) {
        return
    } else if (resultsShown === 1) {
        num1 = finalResults.textContent;
        workingResults.textContent = num1;
        finalResults.textContent = "";
        workingResults.innerHTML += " " + operation + " ";
        resultsShown = 0;
    } else {
        workingResults.textContent += " " + operation + " ";
        decimalCount = 0
        percentCount = 0
        operationCount++
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
            operationCount = 0;
        } else if (currentEquation.slice(-1) === "%"
                    || currentEquation.slice(-1) === ".") {
            workingResults.textContent = currentEquation.slice(0, -1);
            percentCount = 0;
            decimalCount = 0;
        } else {
            workingResults.textContent = currentEquation.slice(0, -1);
            finalResults.textContent = "";
        }
    } else {
        workingResults.textContent = "";
        finalResults.textContent = "";
        percentCount = 0;
        decimalCount = 0;
        operationCount = 0;
    }
}

const buttons = document.querySelectorAll(".calculator-button");
const workingResults = document.querySelector(".results-screen-typing");
const finalResults = document.querySelector(".results-screen-result");
let decimalCount = 0
let percentCount = 0
let operationCount = 0
let resultsShown = 0

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {

        if (isNaN(event.target.id) === false) {
            appendNumber(parseInt(event.target.id));

        } else if (event.target.id === "percent") {
            appendPercent();

        } else if (event.target.id === ".") {
            appendDecimal();

        } else if (event.target.id === "all-clear" ) {
            clearData('ac')

        } else if (event.target.id === "clear") {
            clearData('c')

        } else if (event.target.id === "equals") {
            equaltsTo();
        } else {
            appendOperation(event.target.id);
        }
    });
}