// API Gateway URL
const API_URL = 'http://localhost:5500';

// Utility function to show messages
function showMessage(message, type = 'error') {
  const messageElement = document.getElementById('message');
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }
}

// Check if user is already logged in
function checkLoginStatus() {
  const token = localStorage.getItem('token');
  // Only redirect if on login page, not on order.html
  if (token && window.location.pathname.endsWith('login.html')) {
    window.location.href = 'order.html';
  }
}

// Toggle Password Visibility
function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Check login status
  checkLoginStatus();

  // Form elements
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotPasswordForm = document.getElementById('forgot-password-form');

  // Add event listeners for guest options
  const browseItemsBtn = document.getElementById('browse-items');
  const shopAsGuestBtn = document.getElementById('shop-as-guest');

  if (browseItemsBtn) {
    browseItemsBtn.addEventListener('click', () => {
      window.location.href = 'order.html';
    });
  }

  if (shopAsGuestBtn) {
    shopAsGuestBtn.addEventListener('click', () => {
      window.location.href = 'order.html';
    });
  }

  // Toggle links
  const registerLink = document.getElementById('register-link');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const backToLoginLink = document.getElementById('back-to-login');

  // Password visibility toggles
  const showPasswordCheckbox = document.getElementById('show-password');
  const showLoginPasswordCheckbox = document.getElementById('show-login-password');

  // Form toggle event listeners
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
    registerForm.style.display = 'block';
  });

  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
  });

  backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordForm.style.display = 'none';
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Password visibility event listeners
  showPasswordCheckbox.addEventListener('change', () => {
    togglePasswordVisibility('password');
  });

  showLoginPasswordCheckbox.addEventListener('change', () => {
    togglePasswordVisibility('login-password');
  });

  // Registration Form Submission
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    console.log('Registration form found');
    registrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Registration form submitted');
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        phone: document.getElementById('phone').value
      };

      console.log('Form data:', formData);

      try {
        console.log('Sending registration request to:', `${API_URL}/auth/register`);
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        console.log('Registration response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Registration error response:', errorText);
          showMessage('Registration failed: ' + (errorText || 'Unknown error'), 'error');
          return;
        }

        const data = await response.json();
        console.log('Registration response data:', data);

        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = 'order.html';
        } else {
          showMessage('Registration successful but missing token or user data', 'error');
        }
      } catch (error) {
        console.error('Registration error:', error);
        showMessage('Registration failed. Please try again.', 'error');
      }
    });
  } else {
    console.error('Registration form not found');
  }

  // Login Form Submission
  const userLoginForm = document.getElementById('user-login-form');
  if (userLoginForm) {
    userLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = 'order.html';
        } else {
          showMessage(data.error || 'Login failed', 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        showMessage('Login failed. Please try again.', 'error');
      }
    });
  }

  // Forgot Password Form Submission
  const passwordResetForm = document.getElementById('password-reset-form');
  if (passwordResetForm) {
    passwordResetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('reset-email').value;

      try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }),
          credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
          showMessage('Password reset instructions have been sent to your email.', 'success');
          passwordResetForm.reset();
          setTimeout(() => {
            forgotPasswordForm.style.display = 'none';
            loginForm.style.display = 'block';
          }, 3000);
        } else {
          showMessage(data.error || 'Failed to process password reset request', 'error');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        showMessage('Failed to process password reset request. Please try again.', 'error');
      }
    });
  }

  // Load products
  const productList = document.getElementById('productList');
  if (productList) {
    loadProducts();
  }
});

// Load products
async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/orders/products`);
    const products = await response.json();
    
    const productList = document.getElementById('productList');
    if (productList) {
      productList.innerHTML = products.map(product => `
        <div class="product-card">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>Category: ${product.category}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Add to cart function
function addToCart(productId) {
  // Implement cart functionality
  console.log('Adding product to cart:', productId);
}
