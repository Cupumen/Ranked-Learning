// Define quiz questions
const quizData = [
    { question: "Berapakah percepatan gravitasi di bumi? (m/s²)", answer: "9.8" },
    { question: "Berapa massa jenis air dalam kg/m³?", answer: "1000.0" },
    { question: "Berapakah kecepatan cahaya dalam m/s?", answer: "299792.5" }
];

let currentQuestionIndex = 0;
let userAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || new Array(quizData.length).fill("");

// Debugging function to show errors
function showError(message) {
    console.error("ERROR:", message);
    let errorBox = document.getElementById("error-message");
    if (errorBox) {
        errorBox.innerHTML = message;
        errorBox.style.display = "block";
    }
}

// Ensure user is logged in
document.addEventListener("DOMContentLoaded", function () {
    try {
        if (!localStorage.getItem("loggedInUser")) {
            throw new Error("Silakan login terlebih dahulu.");
        }

        document.getElementById("total-questions").textContent = quizData.length;
        loadQuestion();
        updateNavigator();
        startTimer();
    } catch (error) {
        showError(error.message);
        window.location.href = "index.html";
    }
});

// Timer setup
function startTimer() {
    try {
        let startTime = parseInt(localStorage.getItem("quizStartTime")) || Date.now();
        const quizDuration = 3 * 60 * 60 * 1000; // 3 hours
        let endTime = startTime + quizDuration;

        localStorage.setItem("quizStartTime", startTime);
        localStorage.setItem("quizEndTime", endTime);

        updateTimer();
        setInterval(updateTimer, 1000);
    } catch (error) {
        showError("Timer error: " + error.message);
    }
}

// Update timer
function updateTimer() {
    try {
        let now = Date.now();
        let endTime = parseInt(localStorage.getItem("quizEndTime"));
        let remainingTime = endTime - now;

        if (remainingTime <= 0) {
            document.getElementById("timer").textContent = "Time Left: 00:00:00";
            alert("Waktu habis! Jawaban akan dikumpulkan.");
            submitQuiz();
            return;
        }

        let hours = String(Math.floor(remainingTime / (1000 * 60 * 60))).padStart(2, '0');
        let minutes = String(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        let seconds = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, '0');

        document.getElementById("timer").textContent = `Time Left: ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        showError("Update timer error: " + error.message);
    }
}

// Load current question
function loadQuestion() {
    try {
        if (currentQuestionIndex >= 0 && currentQuestionIndex < quizData.length) {
            document.getElementById("question").textContent = quizData[currentQuestionIndex].question;
            document.getElementById("answer").value = userAnswers[currentQuestionIndex] || "";
        } else {
            throw new Error("Soal tidak ditemukan!");
        }
        updateNavigationButtons();
    } catch (error) {
        showError("Load question error: " + error.message);
    }
}

// Save answer
function saveAnswer() {
    try {
        let input = document.getElementById("answer").value;
        let regex = /^\d+(\.\d{1})?$/;

        if (!regex.test(input) && input !== "") {
            throw new Error("Jawaban harus berupa angka dengan satu angka desimal! Contoh: 10.2");
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
    try {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
            updateNavigator();
        }
    } catch (error) {
        showError("Next question error: " + error.message);
    }
}

function prevQuestion() {
    try {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
            updateNavigator();
        }
    } catch (error) {
        showError("Previous question error: " + error.message);
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
    } catch (error) {
        showError("Update navigator error: " + error.message);
    }
}

// Jump to a question
function goToQuestion(index) {
    try {
        currentQuestionIndex = index;
        loadQuestion();
        updateNavigator();
    } catch (error) {
        showError("Go to question error: " + error.message);
    }
}

// Submit quiz with confirmation
function submitQuiz() {
    try {
        let confirmation = confirm("Apakah Anda yakin ingin mengumpulkan jawaban?");
        if (confirmation) {
            localStorage.removeItem("quizAnswers"); // ✅ Reset answers after submission
            localStorage.removeItem("quizStartTime");
            localStorage.removeItem("quizEndTime");
            window.location.href = "answer.html";
        }
    } catch (error) {
        showError("Submit quiz error: " + error.message);
    }
}

// Logout function (does NOT clear quiz answers)
function logout() {
    try {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    } catch (error) {
        showError("Logout error: " + error.message);
    }
}

// Update navigation button visibility
function updateNavigationButtons() {
    try {
        document.getElementById("prev-btn").style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
        document.getElementById("next-btn").style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";

        let submitBtn = document.getElementById("submit-btn");
        submitBtn.style.display = "inline-block";
        submitBtn.disabled = currentQuestionIndex !== quizData.length - 1;
    } catch (error) {
        showError("Update navigation buttons error: " + error.message);
    }
}
