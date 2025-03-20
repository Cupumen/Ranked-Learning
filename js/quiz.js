let currentQuestion = 0;
let timeRemaining = 3 * 60 * 60; // 3 hours in seconds
let timerInterval;

const questions = [
    {
        question: "What is Newton's First Law?",
        options: ["Object stays in motion", "Force equals mass times acceleration", "Every action has a reaction", "Gravity pulls objects down"],
        correct: "A"
    },
    {
        question: "What is the speed of light?",
        options: ["3,000 km/s", "300,000 km/s", "30,000 km/s", "3,000,000 km/s"],
        correct: "B"
    },
    {
        question: "What is the formula for force?",
        options: ["F = mv", "F = ma", "F = mgh", "F = 1/2mv²"],
        correct: "B"
    }
];

const userAnswers = new Array(questions.length).fill(null);

function showQuestion() {
    document.getElementById("question").innerText = questions[currentQuestion].question;
    document.getElementById("optionA").innerText = questions[currentQuestion].options[0];
    document.getElementById("optionB").innerText = questions[currentQuestion].options[1];
    document.getElementById("optionC").innerText = questions[currentQuestion].options[2];
    document.getElementById("optionD").innerText = questions[currentQuestion].options[3];

    const answerButtons = document.getElementsByName("answer");
    answerButtons.forEach(button => button.checked = false);

    if (userAnswers[currentQuestion]) {
        document.querySelector(`input[value="${userAnswers[currentQuestion]}"]`).checked = true;
    }
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
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestion] = selectedOption.value;
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
