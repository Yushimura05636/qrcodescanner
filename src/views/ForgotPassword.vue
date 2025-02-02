<template>
  <div class="min-h-screen flex flex-col items-center relative">
    <!-- Background Image Container -->
    <div class="fixed inset-0" style="z-index: 0;">
      <img 
        src="../assets/img/bg.png"
        alt="Background"
        class="w-full h-full object-cover opacity-20"
      />
    </div>

    <!-- Header Banner -->
    <div class="h-30 bg-gradient-to-r from-blue-500 to-blue-600 w-full flex items-center justify-between relative" style="z-index: 1;">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center ml-8">
        <svg 
          class="h-8 w-8 text-white mr-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
        <h1 class="text-2xl font-bold text-white">QR Scanner</h1>
      </div>

      <!-- Right side: Navigation -->
      <nav class="flex items-center mr-8">
        <router-link 
          to="/user-login" 
          class="px-3 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
        >
          Back to Login
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-grow w-full flex items-start justify-between px-4 sm:px-20 pt-8 relative flex-col md:flex-row gap-8 md:gap-0" style="z-index: 1;">
      <!-- Form Section -->
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md relative mx-auto md:mx-0">
        <div class="p-4 sm:p-8 relative">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Reset Password</h2>
          
          <!-- Step 1: Validation Form -->
          <form v-if="!isValidated" class="space-y-4" @submit.prevent="handleValidation">
            <!-- Student ID -->
            <div class="mb-3 py-3">
              <input 
                type="text" 
                id="studentId"
                v-model="studentId"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="Student ID"
                required
              >
            </div>

            <!-- QR Code String -->
            <div class="mb-3 py-3">
              <input 
                type="text" 
                id="qr_code"
                v-model="qr_code"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="QR Code"
                required
              >
            </div>

            <!-- First Name -->
            <div class="mb-3 py-3">
              <input 
                type="text" 
                id="firstname"
                v-model="firstname"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="First Name"
                required
              >
            </div>

            <!-- Last Name -->
            <div class="mb-3 py-3">
              <input 
                type="text" 
                id="lastname"
                v-model="lastname"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="Last Name"
                required
              >
            </div>

            <!-- Email -->
            <div class="mb-3 py-3">
              <input 
                type="email" 
                id="email"
                v-model="email"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="Email"
                required
              >
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium text-sm mt-6"
            >
              Validate Information
            </button>

            <p class="text-sm text-center text-gray-500 mt-2">Already have an account? <a href="/user_login" class="text-blue-500 hover:underline">Login here</a></p>
          </form>

          <!-- Step 2: Password Reset Form -->
          <form v-else class="space-y-4" @submit.prevent="handlePasswordReset">
            <!-- New Password -->
            <div class="mb-3 py-3">
              <input 
                type="password" 
                id="password"
                v-model="password"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="New Password"
                required
              >
            </div>

            <!-- Confirm Password -->
            <div class="mb-3 py-3">
              <input 
                type="password" 
                id="confirmPassword"
                v-model="confirmPassword"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                placeholder="Confirm New Password"
                required
              >
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium text-sm mt-6"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <!-- Phone Image Section (Right) -->
      <div class="w-full max-w-lg ml-0 md:ml-8 rounded-2xl overflow-hidden hidden md:block">
        <div class="relative h-full min-h-[600px] flex items-center justify-center">
          <img 
            src="../assets/img/Phone.png" 
            alt="Phone" 
            class="w-full h-full object-contain p-8"
          />
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg p-8 shadow-xl relative z-10 max-w-sm w-full mx-4">
        <div class="text-center">
          <div class="flex items-center justify-center">
            <div class="flex-auto"></div>
            <div class="mx-auto w-24 h-24 rounded-full bg-orange-100 mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src="../assets/img/Logo.png" 
                alt="Success Logo" 
                class="w-16 h-16 object-contain animate-logo"
              />
            </div>
            <div class="flex-auto"></div>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Password Reset Successful!</h3>
          <p class="text-sm text-gray-500 mb-4">Your password has been successfully reset.</p>
          <button 
            @click="goToLogin" 
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Login Now
          </button>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div v-if="showError" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg p-8 shadow-xl relative z-10 max-w-sm w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Error</h3>
          <p class="text-sm text-gray-500 mb-4">{{ errorMessage }}</p>
          <button 
            @click="showError = false" 
            class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-blue-500 to-blue-600 w-full mt-auto relative" style="z-index: 1;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { config } from '../router';
const API_URL = config.API_URL;

export default {
  name: 'ForgotPassword',
  data() {
    return {
      studentId: '',
      qr_code: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      isValidated: false,
      showSuccess: false,
      showError: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleValidation() {
      try {
        const response = await axios.post(`${API_URL}/validate_forgot_password`, {
          user_id: this.studentId,
          qr_code: this.qr_code,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email
        });

        console.log(response.data.valid);

        if (!response.data.valid) {
          throw new Error(response.data.message || 'Validation failed');
        }

        this.isValidated = true;
      } catch (error) {
        console.error('Validation error:', error);
        this.showError = true;
        this.errorMessage = error.response?.data?.message || 'Failed to validate your information. Please try again.';
      }
    },

    async handlePasswordReset() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const response = await axios.post(`${API_URL}/reset_password`, {
          user_id: this.studentId,
          email: this.email,
          password: this.password
        });

        console.log(response.data);

        if (!response.data.valid) {
            throw new Error(response.data.message || 'Password reset failed');
        }

        this.showSuccess = true;
      } catch (error) {
        console.error('Password reset error:', error);
        this.showError = true;
        this.errorMessage = error.message || 'Failed to reset password. Please try again.';
      }
    },

    goToLogin() {
      this.$router.push('/user_login');
    }
  }
}
</script>

<style scoped>
.h-30 {
  height: 7.5rem;
}

/* Animation for modals */
.fixed {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .h-30 {
    height: 5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .ml-8 {
    margin-left: 1rem;
  }

  .mr-8 {
    margin-right: 1rem;
  }

  nav a {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}

/* Input styling */
input {
  background-color: #f8fafc;
}

input:focus {
  background-color: white;
}

/* Dark mode support for inputs */
@media (prefers-color-scheme: dark) {
  input {
    background-color: #1e293b;
    color: #e2e8f0;
  }
  
  input::placeholder {
    color: #64748b;
  }
  
  input:focus {
    background-color: #0f172a;
  }
}
</style>