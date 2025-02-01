<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <!-- Error Popup -->
    <div v-if="showError" 
         class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-8 flex flex-col items-center transform animate-popup">
        <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg 
            class="w-12 h-12 text-red-500 animate-error" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="3" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p class="text-xl font-semibold text-gray-900">Login Failed</p>
        <p class="text-gray-600 mt-2">Invalid email or password</p>
      </div>
    </div>

    <!-- Success Popup -->
    <div v-if="showSuccess" 
         class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-8 flex flex-col items-center transform animate-popup">
        <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg 
            class="w-12 h-12 text-green-500 animate-success" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="3" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p class="text-xl font-semibold text-gray-900">Login Successful</p>
        <p class="text-gray-600 mt-2">Welcome back!</p>
      </div>
    </div>

    <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl min-h-[600px] flex relative">
      <!-- Left side - Image -->
      <div class="hidden lg:block lg:w-1/2 bg-cover bg-center relative" 
           style="background-image: url('https://thumbs.dreamstime.com/b/close-up-young-women-hand-holding-smartphone-scanning-qr-code-digital-payment-customer-paying-money-online-using-mobile-204366639.jpg')">
        <div class="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
      </div>

      <!-- Right side - Login Form -->
      <div class="w-full lg:w-1/2 p-16 relative z-10">
        <div class="max-w-md mx-auto w-full">
          <h2 class="text-3xl font-bold text-orange-600 pb-12">Welcome Back</h2>
          
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="pt-4 pb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 pb-2">Email</label>
              <input 
                type="email" 
                id="email"
                v-model="email"
                class="mt-1 block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                       placeholder-gray-400"
                placeholder="Enter your email"
                required
              >
            </div>

            <div class="pt-4 pb-4">
              <label for="password" class="block text-sm font-medium text-gray-700 pb-2">Password</label>
              <input 
                type="password" 
                id="password"
                v-model="password"
                class="mt-1 block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                       placeholder-gray-400"
                placeholder="Enter your password"
                required
              >
            </div>

            <div class="flex items-center justify-between pt-6 pb-6">
              <div class="flex items-center">
                
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-orange-600 hover:text-orange-500">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div class="pt-6 pb-6">
              <button 
                type="submit" 
                class="w-full bg-orange-600 text-white py-2.5 px-6 text-base font-medium rounded-lg 
                       hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-orange-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>

            <div class="text-center pt-6">
              <router-link 
                to="/register" 
                class="text-sm text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                Don't have an account? Create one
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showError: false,
      showSuccess: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/login', {
          email: this.email,
          password: this.password
        });

        if (response.data) {
          this.showSuccess = true;
          console.log(response.data.token);
          this.$router.push('/scanner');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 2000);
      }
    }
  }
}
</script>

<style scoped>
input, select, button {
  transition: all 0.2s ease-in-out;
}

/* Error Popup Animations */
@keyframes popup {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes error {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-popup {
  animation: popup 0.5s ease-out forwards;
}

.animate-error {
  animation: error 0.8s ease-out forwards;
}

/* Success Animation */
@keyframes success {
  0% {
    stroke-dasharray: 0, 100;
  }
  100% {
    stroke-dasharray: 100, 100;
  }
}

.animate-success {
  stroke-dasharray: 0, 100;
  animation: success 0.8s ease-out forwards;
  animation-delay: 0.2s;
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

  input {
    background-color: #2d3748;
    color: #fff;
    border-color: #4a5568;
  }

  input::placeholder {
    color: #718096;
  }
  
  .text-gray-900 {
    color: #fff;
  }
  
  .text-gray-600 {
    color: #a0aec0;
  }
  
  .bg-red-100 {
    background-color: rgba(245, 101, 101, 0.2);
  }

  .bg-green-100 {
    background-color: rgba(74, 222, 128, 0.2);
  }

  .text-green-500 {
    color: #4ade80;
  }
}
</style>