function showView(viewId) {
    document.querySelectorAll(".auth-view, .dashboard").forEach(view => {
        view.classList.add("hidden");
    });
    document.getElementById(viewId).classList.remove("hidden");
    clearMessages();
}
 
function clearMessages() {
    document.querySelectorAll(".message").forEach(msg => {
        msg.textContent = "";
        msg.className = "message";
    });
}
 
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        button.textContent = "Ocultar";
    } else {
        input.type = "password";
        button.textContent = "Ver";
    }
}
 
function getUsers() {
    return JSON.parse(localStorage.getItem("orderfast_users") || "[]");
}
 
function setMessage(id, text, type) {
    const message = document.getElementById(id);
    message.textContent = text;
    message.className = "message " + type;
}
 
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
 
    const name = document.getElementById("fullName").value.trim();
    const username = document.getElementById("newUser").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
 
    if (password !== confirm) {
        setMessage("registerMessage", "Las contraseñas no coinciden.", "error");
        return;
    }
 
    const users = getUsers();
 
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        setMessage("registerMessage", "Ese usuario ya está registrado.", "error");
        return;
    }
 
    users.push({ name, username, email, role, password });
    localStorage.setItem("orderfast_users", JSON.stringify(users));
 
    setMessage("registerMessage", "Cuenta creada correctamente. Ahora puedes iniciar sesión.", "success");
 
    setTimeout(() => {
        document.getElementById("registerForm").reset();
        document.getElementById("loginUser").value = username;
        showView("loginView");
    }, 1200);
});
 
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
 
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPassword").value;
    const users = getUsers();
 
    // Cuenta de demostración para probar la pantalla sin registrarse.
    const demoUser = {
        name: "Administrador",
        username: "admin",
        password: "123456",
        role: "Administrador"
    };
 
    const user = username === demoUser.username && password === demoUser.password
        ? demoUser
        : users.find(u => u.username === username && u.password === password);
 
    if (!user) {
        setMessage("loginMessage", "Usuario o contraseña incorrectos.", "error");
        return;
    }
 
    localStorage.setItem("orderfast_session", JSON.stringify(user));
    loadDashboard(user);
});
 
function loadDashboard(user) {
    document.getElementById("welcomeUser").textContent = user.name;
    document.getElementById("welcomeRole").textContent = user.role;
    showView("dashboardView");
}
 
function logout() {
    localStorage.removeItem("orderfast_session");
    document.getElementById("loginForm").reset();
    showView("loginView");
    setMessage("loginMessage", "Sesión cerrada correctamente.", "success");
}
 
function showDemoMessage() {
    const message = document.getElementById("demoMessage");
    message.textContent = "Esta sección está preparada para conectar con la base de datos MySQL.";
    setTimeout(() => message.textContent = "", 3000);
}
 
window.addEventListener("DOMContentLoaded", () => {
    const session = JSON.parse(localStorage.getItem("orderfast_session") || "null");
    if (session) loadDashboard(session);
});
 