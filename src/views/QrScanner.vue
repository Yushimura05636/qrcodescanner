<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center">
    <!-- Header Banner -->
    <div class="h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full flex items-center justify-between">
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
          to="/scanner" 
          class="nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200"
        >
          Scanner
        </router-link>
        <router-link 
          to="/history" 
          class="nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200"
        >
          History
        </router-link>
        <router-link 
          to="/about" 
          class="px-4 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
          :class="{ 'opacity-75 font-semibold': $route.path === '/about' }"
        >
          Users
        </router-link>
        <button 
          @click="logout" 
          class="ml-4 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-200"
        >
          Logout
        </button>
      </nav>
    </div>
    
    <!-- empty div for spacing -->
    <div class="h-10"></div>

    <!-- Stats Section -->
    <div class="max-w-4xl w-full px-4 sm:px-6 lg:px-8 mx-auto mt-8">
      <div class="grid grid-cols-3 gap-6">

        
        <!-- Total Scans -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-start">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div class="ml-4 flex flex-col items-center flex-grow">
              <h2 class="text-2xl font-semibold text-gray-900">{{ totalScans }}</h2>
              <p class="text-gray-500 mt-1">Total Scans</p>
            </div>
          </div>
        </div>

        <!-- Time In -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <div class="ml-4 flex flex-col items-center flex-grow">
              <h2 class="text-2xl font-semibold text-gray-900">{{ totalTimeIn }}</h2>
              <p class="text-gray-500 mt-1">Total Time In</p>
            </div>
          </div>
        </div>
        
        <!-- Total Time Out -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-start">
            <div class="p-3 rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div class="ml-4 flex flex-col items-center flex-grow">
              <h2 class="text-2xl font-semibold text-gray-900">{{ totalTimeOut }}</h2>
              <p class="text-gray-500 mt-1">Total Time Out</p>
            </div>
          </div>
        </div>
        
        <!-- Total Registered -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-start">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-4 flex flex-col items-center flex-grow">
              <h2 class="text-2xl font-semibold text-gray-900">{{ totalRegistered }}</h2>
              <p class="text-gray-500 mt-1">Total Registered</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <!-- empty div for spacing -->
    <div class="h-10"></div>

    <!-- Scanner Button -->
    <button 
      @click="showScanner = true"
      class="mt-8 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors duration-200"
    >
      Open Scanner
    </button>

    <!-- Scanner Modal -->
    <div v-if="showScanner" 
         class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-8 max-w-xl w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">QR Scanner</h3>
          <button 
            @click="closeScanner"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="bg-gray-50 rounded-xl p-4">
          <div id="reader" class="overflow-hidden rounded-lg"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex-grow">
      <div class="relative -mt-24 flex flex-col items-center">
        <!-- Scanner Section -->
        <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl mt-12 pt-8">
          <div class="bg-gray-50 rounded-xl p-4">
            <div id="reader" class="overflow-hidden rounded-lg"></div>
          </div>
          <p class="text-sm text-gray-500 text-center mt-4">
            Position the QR code within the frame to scan
          </p>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto"></div>

    <!-- User Details Modal -->
    <div v-if="userData" class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-8 max-w-xl w-full mx-4 transform animate-popup shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6 pt-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg 
                class="w-6 h-6 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900">User Details Found!</h3>
          </div>
          <button 
            @click="restartScanner"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- User Info -->
        <div class="bg-gray-50 rounded-xl p-6 mb-6 pt-6 pb-6">
          <div class="flex items-center mb-6 pt-2 pb-4">
            <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                :src="`https://ui-avatars.com/api/?name=${userData.firstname}+${userData.lastname}&background=random`"
                alt="User Avatar"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="ml-4">
              <h4 class="text-lg font-semibold text-gray-900 pb-1">
                {{ userData.firstname }} {{ userData.lastname }}
              </h4>
              <p class="text-sm text-gray-500">{{ userData.email }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="bg-white rounded-lg p-4">
              <p class="text-sm text-gray-500 pb-1">Phone</p>
              <p class="text-gray-900 font-medium pt-1">{{ userData.phone }}</p>
            </div>
            <div class="bg-white rounded-lg p-4">
              <p class="text-sm text-gray-500 pb-1">QR Code</p>
              <p class="text-gray-900 font-medium font-mono text-sm pt-1">{{ userData.qr_code }}</p>
            </div>
            <div class="bg-white rounded-lg p-4">
              <p class="text-sm text-gray-500 pb-1">Student Id</p>
              <p class="text-gray-900 font-medium font-mono text-sm pt-1">{{ userData.id }}</p>
            </div>
            <div class="bg-white rounded-lg p-4">
              <p class="text-sm text-gray-500 pb-1">Qr Image</p>
              <qrcode-vue :value="userData.qr_code" :size="40" level="H"></qrcode-vue>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-2 gap-4 pt-4 pb-4">
          <button 
            @click="handleTimeIn"
            :disabled="loading"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl
                   font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ loading ? 'Processing...' : 'Time In' }}
          </button>
          <button 
            @click="handleTimeOut"
            :disabled="loading"
            class="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl
                   font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ loading ? 'Processing...' : 'Time Out' }}
          </button>
        </div>

        <!-- Rescan Button -->
        <button 
          @click="restartScanner"
          class="w-full mt-4 px-6 py-3 bg-gray-800 text-white rounded-xl font-medium
                 hover:bg-gray-900 transition-colors duration-200"
        >
          Re-scan QR Code
        </button>
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
        <p class="text-xl font-semibold text-gray-900">{{ successTitle }}</p>
        <p class="text-gray-600 mt-2">{{ successMessage }}</p>
      </div>
    </div>

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
        <p class="text-xl font-semibold text-gray-900">{{ errorTitle }}</p>
        <p class="text-gray-600 mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import axios from 'axios';
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'QrScanner',
  components: {
    QrcodeVue
  },
  data() {
    return {
      scanner: null,
      scannedResult: null,
      error: null,
      userData: null,
      loading: false,
      showSuccess: false,
      successTitle: '',
      successMessage: '',
      showError: false,
      errorTitle: '',
      errorMessage: '',
      showScanner: false,
      totalScans: 0,
      totalRegistered: 0,
      totalTimeIn: 0,
      totalTimeOut: 0
    }
  },
  async created() {
    await this.fetchStats();
    // Auto-open scanner
    setTimeout(() => {
      this.showScanner = true;
    }, 500);
  },
  mounted() {
    //check if there is token in local storage and if not it will redirect to login page
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
    }

    // Initialize scanner immediately
    this.$nextTick(() => {
      this.initScanner();
    });
  },
  beforeUnmount() {
    if (this.scanner) {
      this.scanner.clear();
    }
  },
  methods: {
    initScanner() {
      if (!this.showScanner) return;
      
      console.log('Initializing scanner...');
      try {
        this.scanner = new Html5QrcodeScanner('reader', {
          qrbox: { width: 250, height: 250 },
          fps: 10,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE
          ],
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          aspectRatio: 1.0
        });
        this.scanner.render(this.onScanSuccess, this.onScanError);
      } catch (error) {
        console.error('Scanner initialization error:', error);
        this.error = 'Failed to initialize scanner';
      }
    },
    async onScanSuccess(decodedText) {
      console.log('QR Code detected:', decodedText);
      this.scannedResult = decodedText;
      
      try {
        const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/people');
        console.log('API Response:', response.data);
        
        // Log all QR codes from the response
        console.log('Available QR codes in database:', response.data.map(user => user.qr_code));
        
        const user = response.data.find(user => {
          console.log('Comparing:');
          console.log('Database QR:', user.qr_code, typeof user.qr_code);
          console.log('Scanned QR:', decodedText, typeof decodedText);
          console.log('Match?:', user.qr_code === decodedText);
          return user.qr_code === decodedText;
        });

        if (user) {
          console.log('User found:', user);
          this.userData = user;
          this.error = null;
          // Clear scanner when user is found
          if (this.scanner) {
            console.log('Clearing scanner - user found');
            await this.scanner.clear();
          }
        } else {
          console.log('No user found for QR code:', decodedText);
          this.error = 'No user found';
          this.userData = null;
        }
      } catch (error) {
        console.error('Error details:', error);
        this.error = 'Error finding user';
        this.userData = null;
      }
    },
    onScanError(error) {
      console.warn('QR Scan error:', error);
    },
    async handleTimeIn() {
      await this.handleTimeRecord('Time In');
      window.location.reload();
    },
    async handleTimeOut() {
      await this.handleTimeRecord('Time Out');
      window.location.reload();
    },
    async handleTimeRecord(description) {
      try {
        this.loading = true;
        const timeRecord = {
          description: description,
          datetime: this.formatDateTime(new Date()),
          person_id: this.userData.id
        };

        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/call/history', timeRecord);
        
        if (response.data) {
          this.successTitle = `${description} Successful`;
          this.successMessage = `Time recorded for ${this.userData.firstname}`;
          this.showSuccess = true;
          this.userData = null;
          
          setTimeout(() => {
            this.closeSuccess();
          }, 2000);
        }
      } catch (error) {
        console.error('Time record error:', error);
        this.errorTitle = 'Time Record Failed';
        this.errorMessage = `Unable to record ${description}. Please try again.`;
        this.showError = true;
        
        setTimeout(() => {
          this.closeError();
        }, 2000);
      } finally {
        this.loading = false;
      }
    },
    formatDateTime(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    restartScanner() {
      if (this.scanner) {
        console.log('Clearing old scanner');
        this.scanner.clear();
        this.userData = null;
        this.error = null;
        this.scannedResult = null;
        console.log('Initializing new scanner');
        setTimeout(() => {
          this.initScanner();
        }, 100); // Small delay to ensure clean initialization
      }
    },
    closeSuccess() {
      this.showSuccess = false;
      this.successTitle = '';
      this.successMessage = '';
      this.restartScanner();
    },
    closeError() {
      this.showError = false;
      this.errorTitle = '';
      this.errorMessage = '';
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    },
    async fetchStats() {
      try {
        const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/history/scan/0');
        const history = response.data;
        
        this.totalScans = history.length;
        let timeInCount = 0;
        let timeOutCount = 0;
        
        console.log(response.data);
        
        this.totalScans = response.data.total_scan;
        this.totalTimeIn = response.data.total_time_in;
        this.totalTimeOut = response.data.total_time_out;
        this.totalRegistered = response.data.total_registered;
        
      } catch (error) {
        console.error('Error fetching stats:', error);
        this.totalScans = 0;
        this.totalTimeIn = 0;
        this.totalTimeOut = 0;
        this.totalRegistered = 0;
      }
    },
    closeScanner() {
      if (this.scanner) {
        this.scanner.clear();
      }
      this.showScanner = false;
      this.userData = null;
      this.error = null;
      this.scannedResult = null;
    }
  },
  watch: {
    showScanner(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initScanner();
        });
      }
    }
  }
}
</script>

<style scoped>
/* Scanner Styles */
#reader {
  width: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

#reader video {
  border-radius: 0.5rem;
}

/* Center the scanner viewport */
#reader div:first-child {
  margin: 0 auto;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  width: 400px;
  position: relative;
  animation: slideIn 0.3s ease;
}

.modal-content h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.user-details {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.user-details p {
  margin: 0.5rem 0;
  color: #4a5568;
}

.user-details strong {
  color: #2d3748;
}

.time-buttons {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  justify-content: center;
}

.time-in-button,
.time-out-button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.time-in-button {
  background-color: #2563eb;
  color: white;
}

.time-out-button {
  background-color: #dc2626;
  color: white;
}

.time-in-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.time-out-button:hover {
  background-color: #b91c1c;
  transform: translateY(-2px);
}

.rescan-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.rescan-button:hover {
  background-color: #45a049;
}

.time-in-button:disabled,
.time-out-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .max-w-4xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .grid {
    gap: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .bg-gray-50 {
    background-color: #1a1c20;
  }
  
  .bg-white {
    background-color: #2d3748;
  }
  
  .text-gray-900 {
    color: #f3f4f6;
  }
  
  .text-gray-600 {
    color: #d1d5db;
  }
  
  .text-gray-500 {
    color: #9ca3af;
  }
  
  .border-white {
    border-color: #374151;
  }
}

/* Enhanced Modal Animations */
@keyframes popup {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-popup {
  animation: popup 0.2s ease-out forwards;
}

/* Scanner Modal Styles */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

#reader {
  width: 100% !important;
  border: none !important;
}

#reader * {
  border-radius: 0.5rem;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #1f2937;
  }
  
  .bg-gray-50 {
    background-color: #111827;
  }
  
  .text-gray-900 {
    color: #f3f4f6;
  }
  
  .text-gray-500 {
    color: #9ca3af;
  }
  
  .text-gray-400 {
    color: #9ca3af;
  }
  
  .text-gray-400:hover {
    color: #f3f4f6;
  }
  
  .bg-blue-100 {
    background-color: rgba(59, 130, 246, 0.2);
  }
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .max-w-xl {
    width: 95%;
    margin: 10px;
  }
}

/* Success Popup Animations */
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

@keyframes success {
  0% {
    stroke-dasharray: 0, 100;
  }
  100% {
    stroke-dasharray: 100, 100;
  }
}

.animate-popup {
  animation: popup 0.5s ease-out forwards;
}

.animate-success {
  stroke-dasharray: 0, 100;
  animation: success 0.8s ease-out forwards;
  animation-delay: 0.2s;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #2d3748;
  }
  
  .text-gray-900 {
    color: #fff;
  }
  
  .text-gray-600 {
    color: #a0aec0;
  }
  
  .bg-green-100 {
    background-color: rgba(74, 222, 128, 0.2);
  }
  
  .text-green-500 {
    color: #4ade80;
  }
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: rgb(255, 237, 213);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.router-link-active::after {
  width: 70%;
}

.router-link-active {
  font-weight: 500;
  color: rgb(255, 237, 213);
}
</style>