function displayAnswers() {
    const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
    const container = document.getElementById("answers-list");
    container.innerHTML = "";

    userAnswers.forEach((answer, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>Question ${index + 1}: ${answer !== null ? answer : "<b>Not answered</b>"}</p>`;
        container.appendChild(div);
    });
}

function submitFinal() {
    if (!confirm("Apakah Anda yakin ingin mengumpulkan jawaban?")) {
        return;
    }

    const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
    const questions = [
        { correct: 9.8 },
        { correct: 3.0 },
        { correct: 6.6 }
    ];

    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].correct) {
            score++;
        }
    }

    let finalScore = (score / questions.length) * 100; // Scale to 100
    alert(`Quiz submitted! Your score: ${finalScore.toFixed(1)} / 100`);

    updateLeaderboard(finalScore);
    window.location.href = "dashboard.html";
}

function updateLeaderboard(score) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: user.fullName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

window.onload = displayAnswers;
