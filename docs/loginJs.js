document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Handle Login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Retrieve stored username and password from localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        // Debugging: Output stored values and entered values
        console.log('Stored Username:', storedUsername);
        console.log('Stored Password:', storedPassword);
        console.log('Entered Username:', username);
        console.log('Entered Password:', password);

        if (!storedUsername || !storedPassword) {
            errorMessage.textContent = "No account found. Please register first.";
            return;
        }

        if (username === storedUsername && password === storedPassword) {
            // Successfully logged in
            localStorage.setItem('isLoggedIn', 'true'); // Persist login state
            window.location.href = 'https://goly67.github.io/FlightPlanning/';
        } else {
            errorMessage.textContent = "Incorrect username or password.";
        }
    });

    // Ensure that pressing "Enter" triggers the form submission
    loginForm.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});
