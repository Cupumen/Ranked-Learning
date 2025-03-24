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
    startTimer();  // Fixed: Ensure timer updates every second
});

// Timer setup
let startTime = parseInt(localStorage.getItem("quizStartTime")) || Date.now();
const quizDuration = 3 * 60 * 60 * 1000; // 3 hours
const endTime = startTime + quizDuration;

localStorage.setItem("quizStartTime", startTime);

// Start and update timer every second
function startTimer() {
    updateTimer(); // Update immediately
    setInterval(updateTimer, 1000); // Now properly updates every second
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
    
    // Ensure submit button is always visible, but only enabled if at the last question
    let submitBtn = document.getElementById("submit-btn");
    submitBtn.style.display = "inline-block"; 
    submitBtn.disabled = currentQuestionIndex !== quizData.length - 1;
}
