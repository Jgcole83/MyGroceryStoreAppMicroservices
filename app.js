// Handle registration form submission
document.getElementById('registration-form')?.addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name')?.value;
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;
  const address = document.getElementById('address')?.value;
  const city = document.getElementById('city')?.value;
  const state = document.getElementById('state')?.value;
  const phone = document.getElementById('phone')?.value;

  const messageElement = document.getElementById('message');
  messageElement.textContent = '';

  try {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, address, city, state, phone }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Registration failed');

    messageElement.textContent = data.message;
    messageElement.style.color = 'green';

    setTimeout(() => {
      // Redirect to the order page after successful registration
      window.location.href = '/order';  // Ensure this path matches your Express route
    }, 2000);

  } catch (error) {
    messageElement.textContent = error.message;
    messageElement.style.color = 'red';
    console.error('Error during registration:', error);
  }
});

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', async function(event) {
  event.preventDefault();

  const loginEmail = document.getElementById('login-email')?.value;
  const loginPassword = document.getElementById('login-password')?.value;

  const messageElement = document.getElementById('message');
  messageElement.textContent = '';

  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Login failed');

    messageElement.textContent = data.message;
    messageElement.style.color = 'green';

    setTimeout(() => {
      // Redirect to the order page after successful login
      window.location.href = '/order';  // Ensure this path matches your Express route
    }, 2000);

  } catch (error) {
    messageElement.textContent = error.message;
    messageElement.style.color = 'red';
    console.error('Error during login:', error);
  }
});

// Toggle show/hide password
document.getElementById('show-password')?.addEventListener('change', function() {
  const passwordField = document.getElementById('password');
  if (passwordField) passwordField.type = this.checked ? 'text' : 'password';
});

document.getElementById('show-login-password')?.addEventListener('change', function() {
  const passwordField = document.getElementById('login-password');
  if (passwordField) passwordField.type = this.checked ? 'text' : 'password';
});
