let currentQuestion = 0;
let timeRemaining = 3 * 60 * 60; // 3 hours in seconds
let timerInterval;

const questions = [
    { question: "What is the acceleration due to gravity on Earth (m/s²)?", correct: 9.8 },
    { question: "What is the speed of light in vacuum (10⁸ m/s)?", correct: 3.0 },
    { question: "What is Planck's constant (6.6x10⁻³⁴ J·s)?", correct: 6.6 }
];

const userAnswers = new Array(questions.length).fill(null);

function showQuestion() {
    document.getElementById("question").innerText = questions[currentQuestion].question;
    document.getElementById("answer").value = userAnswers[currentQuestion] || "";
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function saveAnswer() {
    const answerInput = document.getElementById("answer").value;
    if (answerInput.match(/^\d+(\.\d)?$/)) { // Allow only decimal numbers with 1 decimal place
        userAnswers[currentQuestion] = parseFloat(answerInput);
    } else {
        alert("Invalid input! Please enter a number with one decimal place.");
    }
}

function submitQuiz() {
    saveAnswer();
    clearInterval(timerInterval);

    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correct) {
            score++;
        }
    }

    alert(`Quiz submitted! Your score: ${score} / ${questions.length}`);
    updateLeaderboard(score);
    window.location.href = "dashboard.html";
}

function updateLeaderboard(score) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: user.fullName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        } else {
            timeRemaining--;
            const hours = Math.floor(timeRemaining / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            const seconds = timeRemaining % 60;
            document.getElementById("timer").innerText = `Time Left: ${hours}:${minutes}:${seconds}`;
        }
    }, 1000);
}

window.onload = () => {
    showQuestion();
    startTimer();
};
