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
    createLetters($("#letters_div"));
    // $("#letter_A").click(function(){
    //         alert("");

    // });
    $("#letters_div").find("div").map(function () {
        $("#" + this.id).click(function () {
            console.log(this.innerHTML);
            this.classList.add("selected");
        })
    });
});

function createLetters(letters_ul) {
    let letter = "A"
    letters_ul.append(createLetter(letter))
    do {
        letter = String.fromCharCode(letter.charCodeAt() + 1)
        letters_ul.append(createLetter(letter))
    } while (letter != "Z")
    return letters_ul;
}
function createLetter(letter) {
    const letter_div = document.createElement('div')
    letter_div.id = 'letter_' + letter;
    letter_div.classList.add('letter_div')
    letter_div.innerHTML = letter;
    return letter_div;
}

function checkLetter(){

}