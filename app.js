function calculate() {

}

const buttons = document.querySelectorAll(".calculator-button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
        console.clear()
        console.log(event.target.id);
        console.log('clicked');
    });
}
