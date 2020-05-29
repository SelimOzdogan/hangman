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
    document.addEventListener('keypress', logKey);
});

function logKey(e) {
    eventWhenSelectALetter(e.key.toUpperCase());
}
let FailureCount = 0;

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
            eventWhenSelectALetter(this.innerHTML)
        })
    });
}
function eventWhenSelectALetter(letter) {
    letter_div = $("#letter_" + letter)[0];
    letter_div.classList.add("selected");
    checkLetter(letter_div.innerHTML)
}

function addClickToButtons() {
    const button = $("#newGame");
    button.click(function () {
        clearAll();
    });
}
question = "";
function clearAll() {
    FailureCount = 0;
    $("#letters_div").find("div").removeClass("selected");
    question = CaData[Math.floor(Math.random() * CaData.length)];
    createQuestion();
    changeImage()
}
function changeImage() {
    $("#gallows").attr("src", "images/gallows_" + FailureCount + ".svg");
}

function getQuestion() {
    return question.toUpperCase();
}

function checkLetter(letter, dontCheckWinner) {
    let q = getQuestion();
    if (q.includes(letter)) {
        q.split("").map(function (c, i) {
            if (c == letter) {
                $("#question_letter_" + (i + 1))[0].innerHTML = letter;
            }
        });
    }
    else if (!dontCheckWinner) {
        FailureCount++;
        changeImage()
    }
    if (!dontCheckWinner)
        setTimeout(function () { checkIsItFinished(); }, 100);
}
function fillQuestion() {
    getQuestion().split("").map(ch => checkLetter(ch, true));
}
function checkIsItFinished() {
    if (FailureCount == 6) {
        fillQuestion();
        setTimeout(function () { alert("You Fail!!\nThe answer is " + question); }, 100);
    }
    else {
        let result = $("#question_letters_div")
            .find("div")
            .map(function () { return (this.innerHTML == "&nbsp;&nbsp;" ? false : "") })
            .toArray()
            .join("");
        if (result == "") {
            alert("Winner !!")
            clearAll();
        }
    }
}