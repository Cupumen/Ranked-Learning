// Define quiz questions
const quizData = [
    { question: "Berapakah percepatan gravitasi di bumi? (m/s²)", answer: "9.8" },
    { question: "Berapa massa jenis air dalam kg/m³?", answer: "1000.0" },
    { question: "Berapakah kecepatan cahaya dalam m/s?", answer: "299792.5" }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(""); 

document.addEventListener("DOMContentLoaded", function () {
    loadQuestion();
    updateNavigator();
});

function loadQuestion() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < quizData.length) {
        document.getElementById("question").textContent = quizData[currentQuestionIndex].question;
        document.getElementById("answer").value = userAnswers[currentQuestionIndex] || "";
    } else {
        document.getElementById("question").textContent = "Gagal memuat soal!";
    }
}

// Validate decimal answer format
function validateInput() {
    let input = document.getElementById("answer").value;
    let errorMessage = document.getElementById("error-message");

    let regex = /^\d+(\.\d{1})?$/;
    if (!regex.test(input) && input !== "") {
        errorMessage.textContent = "Jawaban harus berupa angka dengan satu desimal (e.g., 10.2)";
    } else {
        errorMessage.textContent = "";
    }
}

// Save current answer
function saveAnswer() {
    let input = document.getElementById("answer").value;
    if (!/^\d+(\.\d{1})?$/.test(input) && input !== "") {
        alert("Jawaban harus berupa angka dengan satu angka desimal!");
        return;
    }
    userAnswers[currentQuestionIndex] = input;
    updateNavigator();
    alert("Jawaban berhasil disimpan!");
}

// Move to next question
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateNavigator();
    }
}

// Move to previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateNavigator();
    }
}

// Update the question navigator
function updateNavigator() {
    let tracker = document.getElementById("question-tracker");
    tracker.innerHTML = "";

    quizData.forEach((_, index) => {
        let button = document.createElement("button");
        button.textContent = index + 1;
        button.classList.add(userAnswers[index] ? "answered" : "unanswered");
        button.onclick = () => goToQuestion(index);
        tracker.appendChild(button);
    });

    document.getElementById("total-questions").textContent = quizData.length;
}

// Jump to specific question
function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
    updateNavigator();
}

// Submit quiz with confirmation
function goToAnswerPage() {
    if (confirm("Apakah Anda yakin ingin mengumpulkan jawaban?")) {
        alert("Jawaban berhasil dikumpulkan!");
        window.location.href = "answer.html";
    }
}
