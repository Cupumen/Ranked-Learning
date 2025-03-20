const quizData = [
    { question: "What is the speed of light?", options: ["3×10^8 m/s", "3×10^6 m/s", "1×10^8 m/s", "5×10^7 m/s"], answer: "3×10^8 m/s" },
    { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Newton" },
    { question: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: "Newton" }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || new Array(quizData.length).fill(null);
let timeLeft = JSON.parse(localStorage.getItem("quizTimeLeft")) || 3 * 60 * 60; // 3 hours in seconds
const user = JSON.parse(localStorage.getItem("loggedInUser"));

function loadQuestion() {
    document.getElementById("question").textContent = quizData[currentQuestionIndex].question;
    
    let optionsHtml = "";
    quizData[currentQuestionIndex].options.forEach(option => {
        let checked = userAnswers[currentQuestionIndex] === option ? "checked" : "";
        optionsHtml += `<label><input type="radio" name="answer" value="${option}" ${checked}> ${option}</label><br>`;
    });
    document.getElementById("options").innerHTML = optionsHtml;

    updateProgress();
    updateButtons();
}

// Save answer
function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }
}

// Navigate to the next question
function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Navigate to the previous question
function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Update progress widget
function updateProgress() {
    const answeredCount = userAnswers.filter(ans => ans !== null).length;
    document.getElementById("progress").textContent = `Answered: ${answeredCount} / ${quizData.length}`;
}

// Update button visibility
function updateButtons() {
    document.getElementById("back-btn").disabled = currentQuestionIndex === 0;
    document.getElementById("next-btn").style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";
    document.getElementById("submit-btn").style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";
}

// Timer function
function startTimer() {
    const timerElement = document.getElementById("timer");
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        } else {
            timeLeft--;
            localStorage.setItem("quizTimeLeft", JSON.stringify(timeLeft));
            let hours = Math.floor(timeLeft / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = timeLeft % 60;
            timerElement.textContent = `Time Left: ${hours}:${minutes}:${seconds}`;
        }
    }, 1000);
}

// Submit the quiz
function submitQuiz() {
    saveAnswer();
    let finalScore = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].answer) {
            finalScore += 10;
        }
    }

    document.getElementById("question").textContent = "Quiz Submitted!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("progress").textContent = `Your Score: ${finalScore}`;
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("dashboard-btn").style.display = "block";

    saveScore(user.name, finalScore);
    localStorage.removeItem("quizTimeLeft");
    localStorage.removeItem("userAnswers");
}

// Save score to leaderboard
function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by highest score
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Load quiz
if (window.location.pathname.includes("quiz.html")) {
    loadQuestion();
    startTimer();
}

// Load leaderboard
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
