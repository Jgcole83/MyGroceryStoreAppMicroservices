document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  checkLoginStatus();

  // Registration Form Submission
  document.getElementById('registration-form').addEventListener('submit', handleRegister);

  // Login Form Submission
  document.getElementById('user-login-form').addEventListener('submit', handleLogin);

  // Password Toggle Event Listeners
  document.getElementById('show-password').addEventListener('change', togglePasswordVisibility);
  document.getElementById('show-login-password').addEventListener('change', togglePasswordVisibility);

  // DOM Elements
  const registrationForm = document.getElementById('registration-form');
  const loginForm = document.getElementById('user-login-form');
  const forgotPasswordForm = document.getElementById('password-reset-form');
  const message = document.getElementById('message');

  // Form toggle elements
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const backToLoginLink = document.getElementById('back-to-login');
  const registerLink = document.getElementById('register-link');

  // Forms
  const loginFormContainer = document.getElementById('login-form');
  const registerFormContainer = document.getElementById('register-form');
  const forgotPasswordContainer = document.getElementById('forgot-password-form');

  // Password toggle functionality
  const showPasswordCheckbox = document.getElementById('show-password');
  const showLoginPasswordCheckbox = document.getElementById('show-login-password');
  const passwordInput = document.getElementById('password');
  const loginPasswordInput = document.getElementById('login-password');

  // Show/hide password functionality
  showPasswordCheckbox.addEventListener('change', () => {
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
  });

  showLoginPasswordCheckbox.addEventListener('change', () => {
    loginPasswordInput.type = showLoginPasswordCheckbox.checked ? 'text' : 'password';
  });

  // Form visibility toggles
  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'none';
    forgotPasswordContainer.style.display = 'block';
    message.textContent = '';
  });

  backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordContainer.style.display = 'none';
    registerFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
    message.textContent = '';
  });

  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.style.display = 'none';
    forgotPasswordContainer.style.display = 'none';
    registerFormContainer.style.display = 'block';
    message.textContent = '';
  });

  // Handle registration
  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      phone: document.getElementById('phone').value
    };

    try {
      const response = await fetch('http://localhost:5500/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        message.textContent = 'Registration successful! Please login.';
        message.className = 'message success';
        registrationForm.reset();
        // Switch to login form
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      message.textContent = error.message;
      message.className = 'message error';
    }
  });

  // Handle login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
    };

    try {
      const response = await fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the token and user ID
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        // Redirect to order page
        window.location.href = '/order.html';
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      message.textContent = error.message;
      message.className = 'message error';
    }
  });

  // Handle forgot password
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;

    try {
      const response = await fetch('http://localhost:5500/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (response.ok) {
        message.textContent = 'Password reset instructions have been sent to your email.';
        message.className = 'message success';
        forgotPasswordForm.reset();
        // Switch back to login form after 3 seconds
        setTimeout(() => {
          forgotPasswordContainer.style.display = 'none';
          loginFormContainer.style.display = 'block';
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to process password reset request');
      }
    } catch (error) {
      message.textContent = error.message;
      message.className = 'message error';
    }
  });
});

// Check if user is already logged in
function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/order';
  }
}

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
    const response = await fetch('/auth/register', {
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
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();
    
    if (response.status === 200) {
      // Store the token in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      
      // Redirect to order page
      window.location.href = '/order';
    } else {
      document.getElementById('message').textContent = result.error || 'Login failed. Please try again.';
    }
  } catch (error) {
    document.getElementById('message').textContent = 'Error logging in. Please try again later.';
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
