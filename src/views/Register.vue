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
        to="/login" 
        class="flex-auto px-3 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
        :class="{ 'opacity-75 font-semibold': $route.path === '/login' }"
        >
        Login
      </router-link>
      <router-link 
      to="/register" 
      class="flex-auto px-3 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
      :class="{ 'opacity-75 font-semibold': $route.path === '/register' }"
      >
      Register
    </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-grow w-full flex items-start justify-between px-20 pl-50 pt-8 relative" style="z-index: 1;">
      <!-- Form Section (Left) -->
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md relative">
        <!-- Form Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E')"></div>
        </div>
        
        <!-- Form Content -->
        <div class="p-8 relative">
          <h2 class="text-xl font-bold text-gray-900 mb-8">Create Account</h2>
          
          <form class="space-y-5" @submit.prevent="handleRegister">
            <!-- First Name -->
            <div class="mb-4 pb-3">
              <input 
                type="text" 
                id="firstname"
                v-model="firstname"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="First Name"
                required
              >
            </div>

            <!-- Last Name -->
            <div class="mb-4 pb-3">
              <input 
                type="text" 
                id="lastname"
                v-model="lastname"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Last Name"
                required
              >
            </div>

            <!-- Email -->
            <div class="mb-4 pb-3">
              <input 
                type="email" 
                id="email"
                v-model="email"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Email"
                required
                >
              </div>
              <!-- Phone -->
              <div class="mb-4 pb-3">
                <input 
                  type="tel" 
                  id="phone"
                  v-model="phone"
                  class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Phone Number"
                  required
                >
              </div>
              <!-- Gender -->
              <div class="mb-4 pb-3">
                <select 
                  id="gender"
                  v-model="gender"
                  class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
            <!-- Password -->
            <div class="mb-4 pb-3">
              <input 
                type="password" 
                id="password"
                v-model="password"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Password"
                required
              >
            </div>

            <!-- Confirm Password -->
            <div class="mb-4 pb-3">
              <input 
                type="password" 
                id="confirmPassword"
                v-model="confirmPassword"
                class="w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm Password"
                required
              >
            </div>



            <!-- Register Button -->
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium text-sm mt-8"
            >
              Register
            </button>

            <!-- Success Popup Modal -->
            <div v-if="qrString" class="fixed inset-0 flex items-center justify-center z-50">
              <div class="absolute inset-0 bg-black opacity-50"></div>
              <div class="bg-white rounded-lg p-8 shadow-xl relative z-10 max-w-sm w-full mx-4">
                <div class="text-center">
                  <!-- Logo -->
                  <div class="flex flex-col items-center justify-center mb-6">
                    <div class="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                      <svg 
                        class="h-12 w-12 text-orange-600" 
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
                    </div>
                  </div>

                  <!-- Success Message -->
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h3>
                  <p class="text-sm text-gray-500 mb-4">Your QR Code has been generated:</p>
                  <div class="bg-gray-50 p-3 rounded-lg mb-6">
                    <p class="text-xs font-mono text-gray-600">{{ qrString }}</p>
                  </div>

                  <!-- Login Button -->
                  <router-link 
                    to="/user_login"
                    class="w-full inline-block bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Login to Your Account
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Login Link -->
            <p class="text-center text-xs text-gray-600 mt-6">
              Already have an account? 
              <router-link to="/user_login" class="font-medium text-orange-600 hover:text-orange-500">
                Sign in
              </router-link>
            </p>
          </form>
        </div>
      </div>

      <!-- Phone Image Section (Right) -->
      <div class="w-full max-w-lg ml-8 rounded-2xl overflow-hidden">
        <div class="relative h-full min-h-[600px] flex items-center justify-center">
          <!-- Phone Image -->
          <img 
            src="../assets/img/Phone.png" 
            alt="Phone" 
            class="w-full h-full object-contain p-8"
          />
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-blue-500 to-blue-600 w-full mt-auto relative" style="z-index: 1;"></div>
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
      password: '',
      confirmPassword: '',
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
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/user_register', {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          phone: this.phone,
          gender: this.gender || 'male',
          qr_code: this.generateQRString()
        });
        
        console.log('Registration response:', response.data);
        this.qrString = this.generateQRString();
        
        //I will use this function maybe in the future
        // setTimeout(() => {
        //   this.$router.push('/login');
        // }, 3000);
        
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
/* Remove previous styles and keep only transitions */
input, select, button {
  transition: all 0.2s ease-in-out;
}

@media (prefers-color-scheme: dark) {
  .bg-gray-100 {
    background-color: #1a1c20;
  }
  
  .bg-white {
    background-color: #2d3748;
  }

  .text-gray-700 {
    color: #e2e8f0;
  }

  input, select {
    background-color: #2d3748;
    color: #fff;
    border-color: #4a5568;
  }

  input::placeholder {
    color: #718096;
  }

  .bg-green-50 {
    background-color: rgba(74, 222, 128, 0.1);
  }

  .text-green-800 {
    color: #4ade80;
  }

  .text-green-700 {
    color: #34d399;
  }

  .bg-green-100 {
    background-color: rgba(74, 222, 128, 0.2);
  }

  .border-green-200 {
    border-color: rgba(74, 222, 128, 0.3);
  }
}

/* Add any additional styles if needed */
.min-h-[600px] {
  min-height: 600px;
}

.h-30 {
  height: 7.5rem;
}

/* Optional: Add subtle animation to the background pattern */
@keyframes patternFloat {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

.pattern-animate {
  animation: patternFloat 20s linear infinite;
}

/* Add fade animation for popup */
.fixed {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>