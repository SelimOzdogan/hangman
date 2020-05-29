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
    letters_div.append(createDiv("letter", letter, letter))
    do {
        letter = String.fromCharCode(letter.charCodeAt() + 1)
        letters_div.append(createDiv("letter", letter, letter))
    } while (letter != "Z")
    addClickEvents(letters_div);
}
function createDiv(prefixForId, suffixForId, text) {
    const div = document.createElement('div')
    div.id = prefixForId + '_' + suffixForId;
    div.classList.add(prefixForId + '_div')
    div.innerHTML = text;
    return div;
}
function createQuestion() {
    let question_letters = $("#question_letters_div");
    question_letters.empty();
    for (let i = 1; i <= getQuestion().length; i += 1) {

        question_letters.append(createDiv("question_letter", i, "&nbsp;&nbsp;"));
    }
}
function addClickEvents(letters_div) {
    letters_div.find("div").map(function () {
        $("#" + this.id).click(function () {

            console.log(this.innerHTML);
            this.classList.add("selected");
            checkLetter(this.innerHTML)
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
    $("#gallows").attr.removeClass("selected");
    createQuestion();
}

function getQuestion() {
    return "Selim".toUpperCase();
}

function checkLetter(letter) {
    let q = getQuestion();
    if (q.includes(letter)) {
        q.split("").map(function (c, i) {
            if (c == letter) {
                $("#question_letter_" + (i + 1))[0].innerHTML = letter;
                
            }
        })
    }
    else {

    }
    checkIsitFinished();
}