// Define quiz questions
const quizData = [
    { question: "Berapakah percepatan gravitasi di bumi? (m/s²)", answer: "9.8" },
    { question: "Berapa massa jenis air dalam kg/m³?", answer: "1000.0" },
    { question: "Berapakah kecepatan cahaya dalam m/s?", answer: "299792.5" }
];

let currentQuestionIndex = 0;
let userAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || new Array(quizData.length).fill("");

// Ensure user is logged in
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("loggedInUser")) {
        alert("Silakan login terlebih dahulu.");
        window.location.href = "index.html";
        return;
    }

    loadQuestion();
    updateNavigator();
    updateTimer();
    setInterval(updateTimer, 1000);
});

// Timer setup
let startTime = localStorage.getItem("quizStartTime");
if (!startTime || Date.now() - parseInt(startTime) >= 3 * 60 * 60 * 1000) {
    startTime = Date.now();
    localStorage.setItem("quizStartTime", startTime);
}

const quizDuration = 3 * 60 * 60 * 1000;
const endTime = parseInt(startTime) + quizDuration;

// Load current question
function loadQuestion() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < quizData.length) {
        document.getElementById("question").textContent = quizData[currentQuestionIndex].question;
        document.getElementById("answer").value = userAnswers[currentQuestionIndex] || "";
    } else {
        document.getElementById("question").textContent = "Gagal memuat soal!";
    }
    updateNavigationButtons();
}

// Update timer
function updateTimer() {
    let now = Date.now();
    let remainingTime = endTime - now;

    if (remainingTime <= 0) {
        clearInterval(updateTimer);
        alert("Waktu habis! Jawaban akan dikumpulkan.");
        submitQuiz();
        return;
    }

    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById("timer").textContent = `Sisa Waktu: ${hours}j ${minutes}m ${seconds}d`;
}

// Save answer
function saveAnswer() {
    let input = document.getElementById("answer").value;
    let regex = /^\d+(\.\d{1})?$/;

    if (!regex.test(input) && input !== "") {
        alert("Jawaban harus berupa angka dengan satu angka desimal! Contoh: 10.2");
        return;
    }

    userAnswers[currentQuestionIndex] = input;
    localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
    updateNavigator();
    alert("Jawaban berhasil disimpan!");
}

// Navigation functions
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateNavigator();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateNavigator();
    }
}

// Update question tracker
function updateNavigator() {
    let tracker = document.getElementById("question-tracker");
    tracker.innerHTML = "";

    quizData.forEach((_, index) => {
        let button = document.createElement("button");
        button.textContent = index + 1;
        button.style.backgroundColor = userAnswers[index] ? "green" : "red";
        button.style.color = "white";
        button.onclick = () => goToQuestion(index);
        tracker.appendChild(button);
    });

    document.getElementById("total-questions").textContent = quizData.length;
}

// Jump to a question
function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
    updateNavigator();
}

// Submit quiz with confirmation
function submitQuiz() {
    let confirmation = confirm("Apakah Anda yakin ingin mengumpulkan jawaban?");
    if (confirmation) {
        localStorage.removeItem("quizAnswers"); // Reset answers after submission
        localStorage.removeItem("quizStartTime");
        window.location.href = "answer.html"; // Redirect to answer review page
    }
}

// Logout function (does NOT clear quiz answers)
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to login
}

// Update navigation button visibility
function updateNavigationButtons() {
    document.getElementById("prev-btn").style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
    document.getElementById("next-btn").style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";
    document.getElementById("submit-btn").style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";
}
