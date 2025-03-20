const questions = [
    { question: "What is the unit of force?", choices: ["Newton", "Watt", "Joule"], answer: "Newton" },
    { question: "What is the acceleration due to gravity on Earth?", choices: ["9.8 m/s²", "5 m/s²", "12 m/s²"], answer: "9.8 m/s²" },
    { question: "Which law states that an object at rest stays at rest unless acted upon by an external force?", choices: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law"], answer: "Newton's First Law" },
    { question: "What type of energy is stored in a stretched rubber band?", choices: ["Kinetic Energy", "Potential Energy", "Thermal Energy"], answer: "Potential Energy" },
    { question: "Which of these is an example of a scalar quantity?", choices: ["Velocity", "Acceleration", "Temperature"], answer: "Temperature" },
    { question: "What is the formula for kinetic energy?", choices: ["KE = 1/2 mv²", "KE = mgh", "KE = Fd"], answer: "KE = 1/2 mv²" },
    { question: "What does Ohm's Law state?", choices: ["V = IR", "F = ma", "P = VI"], answer: "V = IR" },
    { question: "Which type of wave requires a medium to travel?", choices: ["Electromagnetic Wave", "Sound Wave", "Light Wave"], answer: "Sound Wave" },
    { question: "What is the SI unit of power?", choices: ["Joule", "Watt", "Newton"], answer: "Watt" },
    { question: "Which planet has the strongest gravitational field?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" }
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
