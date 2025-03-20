const users = [
    { id: "test", password: "password123", fullName: "John Doe", school: "High School A", city: "Jakarta", province: "DKI Jakarta", role: "student" },
    { id: "admin", password: "admin123", fullName: "Admin User", school: "-", city: "-", province: "-", role: "admin" }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

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
            window.location.href = "dashboard.html";
        }
    } else {
        alert("Invalid credentials!");
    }
}
