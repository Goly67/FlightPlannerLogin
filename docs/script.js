document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById('loginForm');
            const message = document.getElementById('message');
            const errorMessage = document.getElementById('error-message');
            const loginContainer = document.getElementById('loginContainer');

            const correctUsername = 'admin';  // Correct username
            const correctPassword = 'FlightPlanAdmin2024+';  // Correct password

            // Define expiration time for 3 months (in milliseconds)
            const expirationTime = 3 * 30 * 24 * 60 * 60 * 1000; // 3 months in milliseconds

            // Check if the user is already logged in and if the session is not expired
            const loginData = JSON.parse(localStorage.getItem('loginData'));
            if (loginData && new Date().getTime() < loginData.expiration) {
                // If already logged in and session is valid, redirect to the website
                window.location.href = 'https://goly67.github.io/FlightPlanning/';
            }

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                console.log("Entered Username:", username);
                console.log("Entered Password:", password);
                console.log("Correct Username:", correctUsername);
                console.log("Correct Password:", correctPassword);

                if (username === correctUsername && passwordHash === correctPasswordHash) {
    message.textContent = 'Login successful!';
    message.style.color = 'green';

    // Store a login token with an expiration (e.g., 1 hour from now)
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginExpiry', expiryTime);

    setTimeout(() => {
        window.location.href = 'https://goly67.github.io/FlightPlanning/';
    }, 1000);
                }
