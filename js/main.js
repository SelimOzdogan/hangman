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
    fillScoreBoard();
    addClickToButtons();
    document.addEventListener('keypress', logKey);
    setSoundEffect();
    clearAll();
});

let FailureCount = 0;
let FailCount = 0;
let WinCount = 0;

function setSoundEffect() {
    let failsound = document.createElement("audio");
    failsound.id = 'failsound';
    failsound.src = 'sounds/fail.mp3';
    document.body.appendChild(failsound);
    let winsound = document.createElement("audio");
    winsound.id = 'winsound';
    winsound.src = 'sounds/win.mp3';
    document.body.appendChild(winsound);
}

function fillScoreBoard() {
    increaseScoreBoard("win", WinCount);
    increaseScoreBoard("fail", FailCount);
    increaseScoreBoard("failure", FailureCount);
}
function increaseScoreBoard(id, score = 0) {
    let div = $(`#${id}`).find(".score")[0];
    div.innerHTML = `${score}`;
}
function logKey(e) {
    eventWhenSelectALetter(e.key.toUpperCase());
}

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
    changeImage();
    fillScoreBoard();
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
    if (!dontCheckWinner) {
        fillScoreBoard();
        checkIsItFinished();
    }
}

const failmethods = {
    fillQuestion() {
        return new Promise((resolve, reject) => {
            getQuestion().split("").map(ch => checkLetter(ch, true));
            FailCount += 1;
            resolve('resolved');
        });
    },
    sound() {
        return new Promise((resolve, reject) => {
            $("#failsound")[0].play();
            setTimeout(() => {
                resolve('resolved');
            }, 500);
        });
    },
    message() {
        return new Promise((resolve, reject) => {
            if (confirm("You Fail!!\nThe answer is " + question + "\nDo you want to start new one?"))
                clearAll();
            resolve('resolved');
        });
    }
};
const winmethods = {
    checkQuestion() {
        return new Promise((resolve, reject) => {
            let result = $("#question_letters_div")
                .find("div")
                .map(function () { return (this.innerHTML == "&nbsp;&nbsp;" ? false : "") })
                .toArray()
                .join("");
            resolve(result);
        });
    },
    sound(result) {
        return new Promise((resolve, reject) => {
            if (result == "") {
                WinCount += 1;
                $("#winsound")[0].play();
                setTimeout(() => {
                    resolve('resolved');
                }, 500);
            }
            else {
            }
        });
    },
    message() {
        return new Promise((resolve, reject) => {
            if (confirm("Winner !!\nDo you want to start new one?"))
                clearAll();
            resolve('resolved');
        });
    }
};

function checkIsItFinished() {
    if (FailureCount == 6) {
        failmethods
            .fillQuestion()
            .then(() => failmethods.sound())
            // .then(async () => await failmethods.sound())
            .then(() => failmethods.message())
            // .then(async () => await failmethods.message())
            .catch(console.error);
    }
    else {
        winmethods
            .checkQuestion()
            .then((result) => winmethods.sound(result))
            .then(() => winmethods.message())
            .catch(console.error);
    }
}