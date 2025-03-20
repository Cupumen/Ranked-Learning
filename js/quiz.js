let currentQuestion = 0;

const questions = [
    "What is Newton's First Law?",
    "What is the speed of light?",
    "What is the formula for force?"
];

function showQuestion() {
    document.getElementById("question").innerText = questions[currentQuestion];
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function submitQuiz() {
    alert("Quiz submitted!");
    window.location.href = "dashboard.html";
}

window.onload = showQuestion;
