const users = [
    { id: "test", password: "password123", fullName: "John Doe", school: "High School A", city: "Jakarta", province: "DKI Jakarta", role: "student" },
    { id: "admin", password: "admin123", fullName: "Admin User", school: "-", city: "-", province: "-", role: "admin" }
];

// Store users in localStorage if not already present
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Login function
function login(event) {
    event.preventDefault();

    const userId = document.getElementById("login-id").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(u => u.id === userId && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            // Reset the quiz start time when starting a new session
            localStorage.setItem("quizStartTime", Date.now());
            window.location.href = "dashboard.html";
        }
    } else {
        alert("Invalid credentials!");
    }
}

// Ensure the user is redirected to login if not authenticated
document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");

    // Redirect if not logged in AND not already on the login page
    if (!loggedInUser && !window.location.pathname.endsWith("index.html")) {
        alert("Please log in first.");
        window.location.href = "index.html";
    }
});

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser"); 
    window.location.href = "index.html"; 
}
