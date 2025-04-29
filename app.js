document.addEventListener('DOMContentLoaded', () => {
    // Registration Form Submission
    document.getElementById('registration-form').addEventListener('submit', handleRegister);
  
    // Login Form Submission
    document.getElementById('login-form').addEventListener('submit', handleLogin);
  
    // Password Toggle Event Listeners
    document.getElementById('show-password').addEventListener('change', togglePasswordVisibility);
    document.getElementById('show-login-password').addEventListener('change', togglePasswordVisibility);
  });
  
  // Handle Registration
  async function handleRegister(e) {
    e.preventDefault();
  
    const newUser = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      phone: document.getElementById('phone').value,
    };
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
  
      const result = await response.json();
      document.getElementById('message').textContent = response.status === 201 ? result.message : result.error;
      if (response.status === 201) {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error registering user.';
    }
  }
  
  // Handle Login
  async function handleLogin(e) {
    e.preventDefault();
  
    const loginData = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value,
    };
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
  
      const result = await response.json();
      document.getElementById('message').textContent = response.status === 200 ? result.message : result.error;
      if (response.status === 200) {
        window.location.href = 'order.html'; // Assuming you have order.html
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error logging in.';
    }
  }
  
  // Toggle Password Visibility
  function togglePasswordVisibility() {
    const form = this.closest('form');
    if (form) {
      const passwordField = form.querySelector('input[type="password"]');
      if (passwordField) {
        passwordField.type = this.checked ? 'text' : 'password';
      }
    }
  }
  