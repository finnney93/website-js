function handleImgError() {
document.getElementById('email').setAttribute('readonly', 'readonly');
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('passwordInput');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const serverError = document.getElementById('serverError');

  // Reset error states
  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  serverError.style.display = 'none';
  emailInput.classList.remove('shake');
  passwordInput.classList.remove('shake');

  // Validate inputs
  let hasError = false;
  if (!emailInput.value.trim()) {
    emailError.style.display = 'block';
    emailInput.classList.add('shake');
    hasError = true;
  }
  if (!passwordInput.value.trim()) {
    passwordError.style.display = 'block';
    passwordInput.classList.add('shake');
    hasError = true;
  }

  // Stop if validation fails
  if (hasError) return;

  // Proceed with form submission
  const form = e.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        // Login successful: Show table, hide login box
        document.getElementById('tableBackground').classList.add('active');
        document.getElementById('loginBox').style.display = 'none';
      } else {
        // Invalid credentials
        serverError.textContent = 'Invalid credentials.';
        serverError.style.display = 'block';
        passwordInput.value = ''; // Clear password
      }
    })
    .catch(() => {
      // Server/network issue
      serverError.textContent = 'Invalid credentials. Input correct details';
      serverError.style.display = 'block';
      passwordInput.value = ''; // Clear password
    });
});
