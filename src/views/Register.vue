<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister" class="register-form">
      <h2>Register</h2>
      
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input 
          type="text" 
          id="firstname"
          v-model="firstname"
          required
          placeholder="Enter your first name"
        >
      </div>

      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input 
          type="text" 
          id="lastname"
          v-model="lastname"
          required
          placeholder="Enter your last name"
        >
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <select 
          id="gender"
          v-model="gender"
          required
          class="gender-select"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input 
          type="tel" 
          id="phone"
          v-model="phone"
          required
          placeholder="Enter your phone number"
        >
      </div>

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

      <button type="submit" class="submit-btn">Register</button>
      
      <div v-if="qrString" class="success-message">
        <h3>Registration Successful!</h3>
        <p>Your QR Code String: {{ qrString }}</p>
      </div>

      <p class="login-link">
        Already have an account? 
        <router-link to="/login">Login here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      gender: '',
      qrString: null
    }
  },
  methods: {
    generateQRString() {
      // Generate a random string for QR code
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 8);
      const qrString = `QR_${timestamp}_${randomStr}`.toUpperCase();
      console.log('Generated QR String:', qrString);
      return qrString;
    },
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:8000/api/call/people', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          gender: this.gender || 'male',
          qr_code: this.generateQRString()
        });
        
        console.log('Registration response:', response.data);
        this.qrString = this.generateQRString();
        
        // Show success message
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
        
      } catch (error) {
        console.error('Registration error:', error.response?.data || error);
        alert('Registration failed. Please make sure all fields are filled out.');
      }
    },
    async checkEmailExists() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/check-email`, {
          email: this.email
        });
        // ... rest of the code
      } catch (error) {
        console.error('Error:', error);
      }
    },
    
    async registerUser() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/register`, {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        });
        // ... rest of registration logic
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

.register-form {
  background-color: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  transition: transform 0.3s ease;
}

.register-form:hover {
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

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
}

.login-link a:hover {
  color: #45a049;
  text-decoration: none;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 480px) {
  .register-form {
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

.success-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ecfdf5;
  color: #047857;
  border-radius: 4px;
  text-align: center;
}

.success-message h3 {
  margin-bottom: 10px;
}

.success-message p {
  word-break: break-all;
  font-family: monospace;
  background: #e5e7eb;
  padding: 0.5rem;
  border-radius: 4px;
}

.gender-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.gender-select:focus {
  outline: none;
  border-color: #4CAF50;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}
</style>