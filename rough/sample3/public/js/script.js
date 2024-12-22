function togglePassword(inputId, icon) {
  const passwordInput = document.getElementById(inputId);

  // Toggle password visibility
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.textContent = '🙈';  // Change the icon when password is visible
  } else {
      passwordInput.type = 'password';
      icon.textContent = '👁️';  // Change the icon when password is hidden
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', (event) => {
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
          event.preventDefault(); // Prevent form submission
          const messageDiv = document.getElementById('message');
          messageDiv.style.color = 'red';
          messageDiv.textContent = 'Passwords do not match';
      }
  });
});