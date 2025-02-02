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
          :class="{ 'opacity-75 font-semibold': $route.path === '/user-login' }"
        >
          User Login
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-grow w-full flex items-start justify-between px-20 pt-8 relative" style="z-index: 1;">
      <!-- Form Section (Left) -->
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md relative">
        <div class="p-8 relative">
          <h2 class="text-xl font-bold text-gray-900 mb-8">Login as User</h2>
          
          <form class="space-y-4" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="mb-3 py-3">
              <input 
                type="email" 
                id="email"
                v-model="email"
                class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Email"
                required
              >
            </div>

            <!-- Password -->
            <div class="mb-3 py-3">
              <input 
                type="password" 
                id="password"
                v-model="password"
                class="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Password"
                required
              >
            </div>

            <!-- Forgot Password Link -->
            <div class="flex items-center justify-end mb-2">
              <a 
                href="#" 
                class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Forgot Password?
              </a>
            </div>

            <!-- Login Button -->
            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium text-sm mt-6"
            >
              Login
            </button>

            <!-- Admin Login Link -->
            <div class="text-center mt-4">
              <router-link 
                to="/login" 
                class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Login as Admin
              </router-link>
            </div>

            <!-- Register Link -->
            <p class="text-center text-xs text-gray-600 mt-4">
              Don't have an account? 
              <router-link 
                to="/register" 
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </router-link>
            </p>
          </form>
        </div>
      </div>

      <!-- Phone Image Section (Right) -->
      <div class="w-full max-w-lg ml-8 rounded-2xl overflow-hidden">
        <div class="relative h-full min-h-[600px] flex items-center justify-center">
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

    <!-- Success Popup Modal -->
    <div v-if="showSuccess" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg p-8 shadow-xl relative z-10 max-w-sm w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Login Successful!</h3>
          <p class="text-sm text-gray-500 mb-4">You will be redirected to the dashboard shortly.</p>
        </div>
      </div>
    </div>

    <!-- Error Popup Modal -->
    <div v-if="showError" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg p-8 shadow-xl relative z-10 max-w-sm w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Login Failed</h3>
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
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      showSuccess: false,
      showError: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Reset messages
        this.showSuccess = false;
        this.showError = false;
        this.errorMessage = '';

        // Your login API call here
        const response = await fetch('https://qrscannerdb-production.up.railway.app/api/user_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();
        console.log('user login data:',data);

        if (!response.ok) {
          throw new Error(data.message || 'Invalid credentials');
        }

        // Show success popup
        this.showSuccess = true;
        
        // Store the token if your API returns one
        if (data.token) {
          localStorage.setItem('userToken', data.token);
        }

        // Redirect after a short delay
        setTimeout(() => {
          this.$router.push({
            name: 'user_dashboard',
            params: { id: data.user.id },
            query: { 
              email: data.user.email,
              token: data.token 
            }
          });
        }, 2000);

      } catch (error) {
        console.error('Login error:', error);
        this.showError = true;
        this.errorMessage = error.message || 'Invalid email or password. Please try again.';
      }
    }
  }
}
</script>

<style scoped>
.h-30 {
  height: 7.5rem;
}

/* Optional: Add fade animation for popups */
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
</style>
