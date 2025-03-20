function loadDashboard() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    document.getElementById("username").innerText = user.fullName;
}

function goToQuiz() {
    window.location.href = "quiz.html";
}

function goToLeaderboard() {
    window.location.href = "leaderboard.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

window.onload = loadDashboard;
