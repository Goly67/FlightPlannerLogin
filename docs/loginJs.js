document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://loginapilogger.glitch.me/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json(); // Get token and message from server
                localStorage.setItem('authToken', data.token); // Save token (optional)
                window.location.href = 'https://goly67.github.io/FlightPlanning/'; // Redirect to flight planning page
            } else {
                const error = await response.json();
                errorMessage.textContent = error.message;
            }
        } catch (err) {
            console.error('Login Error:', err);
            errorMessage.textContent = "Something went wrong. Please try again.";
        }
    });
});


