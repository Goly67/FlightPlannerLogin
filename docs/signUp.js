document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signupForm');
    const signupErrorMessage = document.getElementById('signupErrorMessage');
    const signupMessage = document.getElementById('signupMessage');

    // Handle Sign Up
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Check if password is at least 12 characters long
        if (newPassword.length < 12) {
            signupErrorMessage.textContent = 'Password must be at least 12 characters long.';
            return; // Exit if the password is too short
        }

        if (newUsername && newPassword) {
            // Save username and password to localStorage
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);

            signupMessage.textContent = 'Account created successfully! Redirecting to login page...';

            // Redirect after a short delay
            setTimeout(function() {
                window.location.href = 'index.html'; // Redirect to login page
            }, 2000); // 2 seconds delay for user feedback
        } else {
            signupErrorMessage.textContent = 'Please fill in both fields.';
        }
    });

    // Ensure that pressing "Enter" triggers the form submission
    signupForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            signupForm.dispatchEvent(new Event('submit'));
        }
    });
});
