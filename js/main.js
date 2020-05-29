// These are some event handlers to make the demo work well.
// Don't change them unless you know what you're doing!
$(document).ready(function () {
    $('#reset').click(function () {
        document.location.reload();
    });

    $('form').submit(function (event) {
        event.preventDefault();
    });
});


window.addEventListener('DOMContentLoaded', (e) => {
    createLetters();
    addClickToButtons();
});

function createLetters() {
    let letters_div = $("#letters_div");

    let letter = "A"
    letters_div.append(createLetter(letter))
    do {
        letter = String.fromCharCode(letter.charCodeAt() + 1)
        letters_div.append(createLetter(letter))
    } while (letter != "Z")
    addClickEvents(letters_div);
}
function createLetter(letter) {
    const letter_div = document.createElement('div')
    letter_div.id = 'letter_' + letter;
    letter_div.classList.add('letter_div')
    letter_div.innerHTML = letter;
    return letter_div;
}
function addClickEvents(letters_div) {
    letters_div.find("div").map(function () {
        $("#" + this.id).click(function () {
            console.log(this.innerHTML);
            this.classList.add("selected");
        })
    });
}
function addClickToButtons() {
    const button = $("#newGame");
    button.click(function () {
        clearAll();
    });
}
function clearAll() {
    $("#letters_div").find("div").removeClass("selected");
    createQuestion();
}
function checkLetter() {

}