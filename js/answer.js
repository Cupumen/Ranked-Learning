document.addEventListener("DOMContentLoaded", function () {
    const answersContainer = document.getElementById("answers-list");
    const quizData = [
        { question: "Berapakah percepatan gravitasi di bumi? (m/s²)", answer: "9.8" },
        { question: "Berapa massa jenis air dalam kg/m³?", answer: "1000.0" },
        { question: "Berapakah kecepatan cahaya dalam m/s?", answer: "299792.5" }
    ];

    const userAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];

    quizData.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<b>Soal ${index + 1}:</b> ${item.question} <br> 
                              <b>Jawaban Anda:</b> ${userAnswers[index] || "Belum Dijawab"}`;
        answersContainer.appendChild(listItem);
    });
});

// Submit final score
function submitFinal() {
    if (confirm("Apakah Anda yakin ingin mengumpulkan skor?")) {
        alert("Skor telah dikumpulkan ke leaderboard!");
        window.location.href = "leaderboard.html";
    }
}
