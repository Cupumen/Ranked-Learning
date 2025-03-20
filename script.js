const quizData = [
    { question: "What is the speed of light?", options: ["3×10^8 m/s", "3×10^6 m/s", "1×10^8 m/s", "5×10^7 m/s"], answer: "3×10^8 m/s" },
    { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Newton" },
    { question: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: "Newton" }
];

let currentQuestionIndex = 0;
let score = 0;
const user = JSON.parse(localStorage.getItem("loggedInUser"));

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        document.getElementById("question").textContent = quizData[currentQuestionIndex].question;
        let optionsHtml = "";
        quizData[currentQuestionIndex].options.forEach(option => {
            optionsHtml += `<button onclick="checkAnswer('${option}')">${option}</button>`;
        });
        document.getElementById("options").innerHTML = optionsHtml;
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
        score += 10;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function endQuiz() {
    document.getElementById("question").textContent = "Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("score-display").textContent = `Your Score: ${score}`;
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("dashboard-btn").style.display = "block";

    // Save score to LocalStorage for leaderboard
    saveScore(user.name, score);
}

function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by highest score
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

if (window.location.pathname.includes("quiz.html")) {
    loadQuestion();
}

// Load leaderboard dynamically
if (window.location.pathname.includes("leaderboard.html")) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardHtml = "";
    leaderboard.forEach((entry, index) => {
        leaderboardHtml += `<tr><td>${index + 1}</td><td>${entry.name}</td><td>${entry.score}</td></tr>`;
    });
    document.getElementById("leaderboard-table").innerHTML = leaderboardHtml;
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
