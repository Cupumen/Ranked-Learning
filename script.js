const questions = [
    { question: "What is 2 + 2?", choices: ["3", "4", "5"], answer: "4" },
    { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris"], answer: "Paris" },
    { question: "What is 5 * 3?", choices: ["15", "10", "20"], answer: "15" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const leaderboardEl = document.getElementById("leaderboard");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.style.display = "none";
    loadQuestion();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
    } else {
        endQuiz();
    }
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        questionEl.textContent = q.question;
        choicesEl.innerHTML = "";
        q.choices.forEach(choice => {
            let btn = document.createElement("button");
            btn.textContent = choice;
            btn.onclick = () => checkAnswer(choice);
            choicesEl.appendChild(btn);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(choice) {
    if (choice === questions[currentQuestion].answer) {
        score += 10;
        scoreEl.textContent = `Score: ${score}`;
    }
    currentQuestion++;
    loadQuestion();
}

function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = "Quiz Over!";
    choicesEl.innerHTML = "";
    startBtn.style.display = "block";
    updateLeaderboard();
}

function updateLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem("leaderboard", JSON.stringify(scores));
    
    leaderboardEl.innerHTML = "";
    scores.slice(0, 5).forEach((s, i) => {
        let li = document.createElement("li");
        li.textContent = `#${i + 1} - ${s} pts`;
        leaderboardEl.appendChild(li);
    });
}
