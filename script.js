// 1.Getting the required selectors
// 2.Setting up the questions
// 3.Setting up the timer propreties
// 4.Setting up the timer
/*5.Set up many questions so the user can accumulate 
as many points as faireness of the game alows to*/

// Getting the variables,transversing the DOM
var timeEL = document.getElementById("timer");
var questionsEL = document.getElementById("questions");
var answersEL = document.getElementById("answers");
var correctEL = document.getElementById("correct");
var wrongEL = document.getElementById("wrong");
// scores variables
var initialsEL = document.getElementById("initials");
var userScore = document.getElementById("user-score");
var userImput = document.getElementById("user-imput");
var initialBtn = document.getElementById("initial-button");
var scoreCard = document.getElementById("score-card");
var highScore = document.getElementById("highscore");
var time = 60;
var countDown;

var gameScore = 0;
//
var playerHistory = JSON.parse(window.localStorage.getItem("localscore")) || [];
// Current index
var currentIndex = 0;

//Questionaire array
var questions = [{
    question: 'Function is called by:',
    answer: ['Function declaration', 'function Keyword', 'return Keyword', 'Parentheses() following the function name'],
    correct: 'Parentheses() following the function name'
}, {
    // Q 2
    question: 'Conditional Statements are:',
    answer: ['Math.floor()', 'String.lenght', 'console.log()', 'if() else{}'],
    correct: 'if() else{}'
}, {
    // Q 3
    question: 'Boolian Values are:',
    answer: ['Symbols', 'Numbers', 'True/False', 'Arrays[]'],
    correct: 'True/False'
}, {
    // Q4
    question: 'Comparison Operators are:',
    answer: ['===', '=', '&&', '||'],
    correct: '==='
}, {
    // Q 5(reapeating)
    question: 'Conditional Statements are:',
    answer: ['Math.floor()', 'String.lenght', 'console.log()', 'if() else{}'],
    correct: 'if() else{}'
}, {
    // Q 6
    question: 'JavaScript Events are:',
    answer: ['onclick', 'button', 'console.log()', 'ondemand'],
    correct: 'onclick'
}, {
    // Q 7
    question: 'Answer this logic: 88 == "88" ',
    answer: ['True', 'False'],
    correct: 'True'
}, {
    // Q 8
    question: 'Answer this logic: 55 === "55" ',
    answer: ['True', 'False'],
    correct: 'False'
}, {
    // Q 9
    question: 'Answer this logic: 33 !== "33" ',
    answer: ['True', 'False'],
    correct: 'True'

}];

// Setting up the clock function
// when time is up questions tops(no options)
function timer() {
    time--;
    timeEL.textContent = time;
    if (time <= 0) {
        time = 0;
        timeEL.textContent = time;
        timeIsUp();
    }
}
//Time function
function timeIsUp() {
    clearInterval(countDown);
    // this will stop the user from choosing 
    questionsEL.classList.add("hidden");
    answersEL.classList.add("hidden");

    userImput.classList.remove("hidden");
    scoreCard.classList.remove("hidden");
    userScore.textContent = gameScore;

}

function gamerimput() {
    var player = initialsEL.value;
    var newScore = {
        player: player,
        score: gameScore
    };
    playerHistory.push(newScore);
    window.localStorage.setItem("localscore", JSON.stringify(playerHistory));
    //Called the var name
    initialsEL.value = "";
    // Updating UI with scores adn initials
    for (var i = 0; i < playerHistory.length; i++) {
        var highScoresEL = document.getElementById("highScores");
        var scoreNode = document.createElement("li");
        scoreNode.textContent = playerHistory[i].player + " " + playerHistory[i].score;
        highScoresEL.appendChild(scoreNode);
    }
}

function startQuiz() {
    countDown = setInterval(timer, 1000);
    nextQuestion();
}
// Transversing the DOM
function nextQuestion() {
    var currentQuestion = questions[currentIndex].question;
    questionsEL.textContent = currentQuestion;
    answersEL.innerHTML = "";
    for (var i = 0; i < questions[currentIndex].answer.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.setAttribute("value", questions[currentIndex].answer[i]);
        button.textContent = questions[currentIndex].answer[i];
        button.onclick = answer;
        answersEL.append(button);
    }
}
//This function will alert when the answers are correct or wrong
function answer() {
    if (this.value === questions[currentIndex].correct) {

        gameScore += 11;
        correctEL.classList.remove("hidden");
        setTimeout(function() {
            correctEL.classList.add("hidden")

        }, 1000)

    } else {
        time -= 5;
        timeEL.textContent = time;

        wrongEL.classList.remove("hidden");
        setTimeout(function() {
            wrongEL.classList.add("hidden")

        }, 1000)
    }
    currentIndex++;
    if (currentIndex === questions.length) {
        timeIsUp();
    } else {
        nextQuestion();
    }
}

// Clear scores function
// remove getItem. setItem. getItem(personal notes)
var clearScore = document.getElementById("clear-score");
clearScore.addEventListener("click", function(event) {
    event.preventDefault();
    window.localStorage.clear();
});



// Try angain button function refresh()
function refresh() {
    location.reload();
}