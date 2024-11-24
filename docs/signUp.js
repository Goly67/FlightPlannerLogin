document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signupForm');
    const signupErrorMessage = document.getElementById('signupErrorMessage');
    const signupMessage = document.getElementById('signupMessage');

    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Check if password is at least 12 characters long
        if (newPassword.length < 12) {
            signupErrorMessage.textContent = 'Password must be at least 12 characters long.';
            return; // Exit if password is too short
        }

        // Send a POST request to the sign-up API to register the user
        try {
            const signupResponse = await fetch('https://loginapilogger.glitch.me/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUsername, password: newPassword })
            });

            // Check if signup was successful
            if (!signupResponse.ok) {
                const error = await signupResponse.json();
                signupErrorMessage.textContent = error.message;
                return;
            }

            // After successful signup, send a login request to the login API
            const loginResponse = await fetch('https://loginapilogger.glitch.me/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUsername, password: newPassword })
            });

            // If login is successful, store the JWT token
            if (loginResponse.ok) {
                const data = await loginResponse.json();
                console.log(data.message); // Successful login message
                localStorage.setItem('authToken', data.token); // Save token locally

                // Display success message
                signupMessage.textContent = 'Account created successfully! Redirecting...';

                // Redirect after a short delay
                setTimeout(function() {
                    window.location.href = 'index.html'; // Redirect to the next page
                }, 2000); // 2 seconds delay
            } else {
                const error = await loginResponse.json();
                signupErrorMessage.textContent = error.message;
            }

        } catch (err) {
            console.error('Error:', err);
            signupErrorMessage.textContent = 'Something went wrong. Please try again.';
        }
    });

    // Ensure that pressing "Enter" triggers the form submission
    signupForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            signupForm.dispatchEvent(new Event('submit'));
        }
    });
});
