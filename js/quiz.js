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
    try {
        if (!localStorage.getItem("loggedInUser")) {
            alert("Silakan login terlebih dahulu.");
            window.location.href = "index.html";
            return;
        }

        // Display total questions first
        document.getElementById("total-questions").textContent = `Total Soal: ${quizData.length}`;

        loadQuestion();
        updateNavigator();
        updateNavigationButtons();
        updateTimer();
        setInterval(updateTimer, 1000);
    } catch (error) {
        showError("Initialization error: " + error.message);
    }
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
    try {
        if (currentQuestionIndex >= 0 && currentQuestionIndex < quizData.length) {
            document.getElementById("question").textContent = quizData[currentQuestionIndex].question;
            document.getElementById("answer").value = userAnswers[currentQuestionIndex] || "";
        } else {
            document.getElementById("question").textContent = "Gagal memuat soal!";
        }
        updateNavigationButtons();
    } catch (error) {
        showError("Load question error: " + error.message);
    }
}

// Update timer
function updateTimer() {
    try {
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

        document.getElementById("timer").textContent = `Sisa Waktu: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } catch (error) {
        showError("Timer error: " + error.message);
    }
}

// Save answer
function saveAnswer() {
    try {
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
    } catch (error) {
        showError("Save answer error: " + error.message);
    }
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
    try {
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

        document.getElementById("total-questions").textContent = `Total Soal: ${quizData.length}`;
    } catch (error) {
        showError("Update navigator error: " + error.message);
    }
}

// Jump to a question
function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
    updateNavigator();
}

// Submit quiz with confirmation
function submitQuiz() {
    try {
        let confirmation = confirm("Apakah Anda yakin ingin mengumpulkan jawaban?");
        if (confirmation) {
            localStorage.removeItem("quizAnswers"); // Reset answers after submission
            localStorage.removeItem("quizStartTime");
            window.location.href = "answer.html"; // Redirect to answer review page
        }
    } catch (error) {
        showError("Submit quiz error: " + error.message);
    }
}

// Logout function (does NOT clear quiz answers)
function logout() {
    try {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html"; // Redirect to login
    } catch (error) {
        showError("Logout error: " + error.message);
    }
}

// Update navigation button visibility
function updateNavigationButtons() {
    try {
        let prevBtn = document.getElementById("prev-btn");
        let nextBtn = document.getElementById("next-btn");
        let submitBtn = document.getElementById("submit-btn");

        if (prevBtn) prevBtn.style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
        if (nextBtn) nextBtn.style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";
        if (submitBtn) {
            submitBtn.style.display = "inline-block";
            submitBtn.disabled = currentQuestionIndex !== quizData.length - 1;
        }
    } catch (error) {
        showError("Update navigation buttons error: " + error.message);
    }
}

// Show error messages
function showError(message) {
    console.error(message);
    let errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.innerHTML = `<p style="color:red;">${message}</p>`;
    }
}
