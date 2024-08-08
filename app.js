function calculate() {

}

function appendNumber(number) {
    workingResults.innerHTML += number
}

function appendOperation() {

}

function errorMessage() {

}

const buttons = document.querySelectorAll(".calculator-button");
const workingResults = document.querySelector(".results-screen-typing");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {

        if (isNaN(event.target.id) === false) {
            appendNumber(event.target.id);
        } else {

        }
    });
}
