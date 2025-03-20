function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
    const table = document.getElementById("leaderboard-table");
    table.innerHTML = ""; 

    leaderboard.forEach(entry => {
        const row = `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`;
        table.innerHTML += row;
    });
}

function goBack() {
    window.location.href = "dashboard.html";
}

window.onload = loadLeaderboard;
