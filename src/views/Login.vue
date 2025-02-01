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
        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/call', {
          email: this.email,
          password: this.password
        });

        console.log('Response status:', response.status);
        const responseData = await response.data;
        const data = responseData.data;  // Extract the nested data
        console.log('Full response data:', data);
        console.log('Email:', data.user.email);
        console.log('Token:', data.token);

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Check if token exists in response
        if (!data.token) {
          console.error('No token received in response:', data);
          throw new Error('No authentication token received');
        }

        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        console.log('Token stored:', data.token);
        
        // Update Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        // Redirect to home page or dashboard
        this.$router.push('/register');
      } catch (error) {
        console.error('Login error:', error);
        // Here you might want to add error handling UI feedback
        alert(error.message || 'An error occurred during login');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

.login-form {
  background-color: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
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

/* Responsive Design */
@media (max-width: 480px) {
  .login-form {
    padding: 2rem;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  input {
    padding: 0.75rem;
  }

  .submit-btn {
    padding: 0.875rem;
  }
}
</style>