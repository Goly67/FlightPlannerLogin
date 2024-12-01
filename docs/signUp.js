document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById('signupForm');
    const signupErrorMessage = document.getElementById('signupErrorMessage');
    const signupMessage = document.getElementById('signupMessage');

    // Sign-up route
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent default form submission

        const newUsername = document.getElementById('newUsername').value.trim();
        const newPassword = document.getElementById('newPassword').value;

        // Clear previous messages
        signupErrorMessage.textContent = '';
        signupMessage.textContent = '';

        // Validate inputs
        if (!newUsername || !newPassword) {
            signupErrorMessage.textContent = 'Both username and password are required.';
            return;
        }

        if (newPassword.length < 12) {
            signupErrorMessage.textContent = 'Password must be at least 12 characters long.';
            return;
        }

        // Send a POST request to the sign-up API to register the user
        try {
            const signupResponse = await fetch('https://loginapilogger.glitch.me/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUsername, password: newPassword }),
            });

            if (signupResponse.ok) {
                // If signup succeeds
                signupMessage.textContent = 'Sign-up successful! You can now log in.';
                signupForm.reset(); // Clear the form
            } else {
                // Handle specific error messages from the server
                const errorData = await signupResponse.json();
                signupErrorMessage.textContent = errorData.message || 'Failed to sign up. Please try again.';
            }
        } catch (err) {
            console.error('Error:', err);
            signupErrorMessage.textContent = 'Unable to connect to the server. Please try again later.';
        }
    });

    // Ensure that pressing "Enter" triggers the form submission
    signupForm.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            signupForm.dispatchEvent(new Event('submit'));
        }
    });
});
