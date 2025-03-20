// Hardcoded login details
const validUser = {
    id: "test",
    password: "password123",
    name: "Test User"
};

function validateLogin() {
    const enteredId = document.getElementById("student-id").value;
    const enteredPassword = document.getElementById("student-password").value;

    if (enteredId === validUser.id && enteredPassword === validUser.password) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "dashboard.html";  // Redirect to dashboard
        return false;
    } else {
        document.getElementById("login-error").textContent = "Invalid ID or Password!";
        return false;
    }
}

// Display user info in Dashboard
if (window.location.pathname.includes("dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "index.html";  // Redirect to login if not logged in
    } else {
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-id").textContent = user.id;
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";  // Redirect to login page
}
