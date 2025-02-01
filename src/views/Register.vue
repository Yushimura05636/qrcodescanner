<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl min-h-[600px] flex relative">
      <!-- Left side - Image -->
      <div class="hidden lg:block lg:w-1/2 bg-cover bg-center relative" 
           style="background-image: url('https://www.avast.com/hubfs/New_Avast_Academy/what_are_qr_codes_and_how_do_you_scan_them_academy/Academy-What-are-QR-Codes-and-how-do-you-scan-them-Thumb.jpg')">
        <div class="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
      </div>

      <!-- Right side - Register Form -->
      <div class="w-full lg:w-1/2 p-16 relative z-10">
        <div class="max-w-md mx-auto w-full">
          <h2 class="text-3xl font-bold text-orange-600 pb-12">Create Account</h2>
          
          <form class="space-y-6" @submit.prevent="handleRegister">
            <div class="pt-4 pb-4">
              <label for="firstname" class="block text-sm font-medium text-gray-700 pb-2">First Name</label>
              <input 
                type="text" 
                id="firstname"
                v-model="firstname"
                class="mt-1 block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                       placeholder-gray-400"
                placeholder="Enter your first name"
                required
              >
            </div>

            <div class="pt-4 pb-4">
              <label for="lastname" class="block text-sm font-medium text-gray-700 pb-2">Last Name</label>
              <input 
                type="text" 
                id="lastname"
                v-model="lastname"
                class="mt-1 block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                       placeholder-gray-400"
                placeholder="Enter your last name"
                required
              >
            </div>

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
              <label for="phone" class="block text-sm font-medium text-gray-700 pb-2">Phone</label>
              <input 
                type="tel" 
                id="phone"
                v-model="phone"
                class="mt-1 block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                       placeholder-gray-400"
                placeholder="Enter your phone number"
                required
              >
            </div>

            <div class="pt-4 pb-4">
              <label for="gender" class="block text-sm font-medium text-gray-700 pb-2">Gender</label>
              <select 
                id="gender"
                v-model="gender"
                class="mt-1 block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-orange-500 focus:border-orange-500 
                       bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div class="pt-6 pb-6">
              <button 
                type="submit" 
                class="w-full bg-orange-600 text-white py-2.5 px-6 text-base font-medium rounded-lg 
                       hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-orange-500 transition-colors duration-200"
              >
                Register
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="qrString" 
                 class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <h3 class="text-green-800 font-semibold mb-2">Registration Successful!</h3>
              <p class="text-green-700 bg-green-100 p-2 rounded font-mono text-sm">
                Your QR Code: {{ qrString }}
              </p>
            </div>

            <div class="text-center pt-6">
              <router-link 
                to="/login" 
                class="text-sm text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                Already have an account? Sign in
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
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
        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/call/people', {
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
</style>