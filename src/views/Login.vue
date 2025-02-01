<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
          autocomplete="email"
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
          autocomplete="current-password"
        >
      </div>

      <button type="submit" class="submit-btn">Login</button>
      
      <p class="register-link">
        Don't have an account? 
        <router-link to="/register">Register here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/login', {
          email: this.email,
          password: this.password
        });

        // Log the entire response to see its structure
        console.log('Full Response:', response);
        console.log('Response Data:', response.data);

        if (response.data) {
          console.log('Login successful!');
          // Log the data we're trying to access
          console.log('Token:', response.data.token);
          console.log('User:', response.data.user);
          
          // Store in localStorage if needed
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          
          this.$router.push('/AboutView');
        } else {
          console.log('No response data received');
          throw new Error('Login failed - no data received');
        }
      } catch (error) {
        console.error('Login error details:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    }
  },
  mounted() {
    console.log('Login component mounted');
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.login-form {
  background-color: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: transform 0.3s ease;
}

.login-form:hover {
  transform: translateY(-5px);
}

h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(76, 175, 80, 0.11);
}

.submit-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(76, 175, 80, 0.2);
}

.submit-btn:active {
  transform: translateY(0);
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.register-link a:hover {
  color: #45a049;
  text-decoration: none;
  opacity: 0.9;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .login-form {
    background-color: #1a1c20;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  h2, label {
    color: #fff;
  }

  input {
    background-color: #2c3e50;
    border-color: #34495e;
    color: #fff;
  }

  input::placeholder {
    color: #95a5a6;
  }

  .register-link {
    color: #95a5a6;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .login-container {
    max-width: 100%;
    padding: 0 15px;
  }
  
  .login-form {
    padding: 2rem;
    border-radius: 12px;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  input {
    padding: 0.75rem;
    font-size: 0.95rem;
  }

  .submit-btn {
    padding: 0.875rem;
    font-size: 1rem;
  }
}

/* Handle very small screens */
@media (max-width: 320px) {
  .login-form {
    padding: 1.25rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

/* Handle landscape orientation */
@media screen and (orientation: landscape) and (max-height: 500px) {
  .login-form {
    padding: 1.25rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }
}
</style>