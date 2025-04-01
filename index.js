GamePattern = [];
var audios = [];
audios[0] = new Audio("sounds/green.mp3");
audios[1] = new Audio("sounds/red.mp3");
audios[2] = new Audio("sounds/yellow.mp3");
audios[3] = new Audio("sounds/blue.mp3");
audios[4] = new Audio("sounds/wrong.mp3");
var gameOver = true;
index = 0;
level = 0;

function playCard(id) {
    audios[id].play();
    switch (id) {
        case 0:
            $("#green").fadeOut(100).fadeIn(100);
            break;
        case 1:
            $("#red").fadeOut(100).fadeIn(100);
            break;
        case 2:
            $("#yellow").fadeOut(100).fadeIn(100);
            break;
        case 3:
            $("#blue").fadeOut(100).fadeIn(100);
            break;
    }
}
function nextSequence() {
    var id = Math.floor(Math.random() * 4);
    GamePattern.push(id);
    playCard(id);
    level++;
    $("#level-title").text("You are at Level " + level);
}

function gameOverFunc() {
    $("#level-title").text("Game Over, Score: "+ level +" Press Any Key to Restart");
    $("body").addClass("game-over");
}

$(".btn").click(function() {
    if (gameOver) {
        return false;
    }
    var id = $(this).attr("id");
    switch (id) {
        case "green":
            id = 0;
            break;
        case "red":
            id = 1;
            break;
        case "yellow":
            id = 2;
            break;
        case "blue":
            id = 3;
            break;
    }
    playCard(id);
    if (GamePattern[index] == id) {
        index++;
        if (index == GamePattern.length) {
            index = 0;
            setTimeout(function() {
                nextSequence();
            }, 500);
            return true;
        }
    } else {
        audios[4].play();
        gameOver = true;
        gameOverFunc();
        return false;
    }
});

function startGame() {
    if (gameOver) {
        level = 0;
        GamePattern = [];
        gameOver = false;
        setTimeout(function() {
            nextSequence();
        }, 500);
        $("body").removeClass("game-over");
    }
}

$(document).keypress(function() {
    startGame();
});
$("#level-title").click(function() {
    startGame();
});