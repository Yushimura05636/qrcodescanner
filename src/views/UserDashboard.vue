<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
  
  <div v-else-if="!isAuthorized" class="min-h-screen flex items-center justify-center">
    <div class="text-red-600">Unauthorized access. Redirecting...</div>
  </div>

  <div v-else class="min-h-screen flex flex-col items-center relative">
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
      <nav class="flex items-center mr-8 space-x-4">
        <button 
          @click="logout" 
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Logout
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-grow w-full flex flex-col items-center px-8 pt-8 relative" style="z-index: 1;">
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">
        <!-- Loading State -->
        <div v-if="loading" class="p-8 flex justify-center items-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-8 text-center text-red-600">
          {{ error }}
        </div>

        <!-- Content -->
        <div v-else class="p-8">
          <h2 class="text-xl font-bold text-gray-900 mb-6">User Dashboard</h2>
          
          <!-- QR Code Display Section -->
          <div class="flex flex-col items-center justify-center mb-8">
            <div 
              @click="showEnlargedQR = true"
              class="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            >
              <qrcode-vue 
                :value="qrCodeUrl" 
                :size="192" 
                level="H"
                render-as="svg"
              />
            </div>
            <p class="text-sm text-gray-600 mt-3">Your Personal QR Code (Click to enlarge)</p>
          </div>

          <!-- Enlarged QR Code Modal -->
          <div 
            v-if="showEnlargedQR" 
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="showEnlargedQR = false"
          >
            <div 
              class="bg-white p-8 rounded-lg shadow-xl max-w-xl mx-4"
              @click.stop
            >
              <div class="flex justify-end mb-4">
                <button 
                  @click="showEnlargedQR = false"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <qrcode-vue 
                :value="qrCodeUrl" 
                :size="400" 
                level="H"
                render-as="svg"
              />
            </div>
          </div>

          <!-- Stats and Profile Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Stats Card -->
            <div class="bg-blue-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-blue-900 mb-2">Your QR Code Stats</h3>
              <div class="flex justify-between items-center">
                <span class="text-sm text-blue-600">Total Scans</span>
                <span class="text-2xl font-bold text-blue-700">{{ scans.length }}</span>
              </div>
            </div>

            <!-- Profile Card -->
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Profile Info</h3>
              <div class="space-y-2">
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Name:</span> {{ userName }}
                </p>
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Email:</span> {{ userEmail }}
                </p>
              </div>
            </div>
          </div>

          <!-- Scan History Table -->
          <div class="bg-white rounded-lg border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Scan History</h3>
            </div>
            <div class="max-h-[160px] overflow-y-auto custom-scrollbar">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Date & Time</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Description</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="scans.length === 0">
                    <td colspan="2" class="px-6 py-4 text-center text-sm text-gray-500">
                      No scan history available
                    </td>
                  </tr>
                  <tr v-for="(scan, index) in scans" :key="index" class="h-[60px]">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatDateTime(scan.date) }}
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <span 
                        :class="{
                          'text-blue-600 font-medium': scan.description.toLowerCase().includes('time in'),
                          'text-red-600 font-medium': scan.description.toLowerCase().includes('time out')
                        }"
                      >
                        {{ scan.description }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-blue-500 to-blue-600 w-full mt-auto relative" style="z-index: 1;"></div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import axios from 'axios';

export default {
  name: 'UserDashboard',
  components: {
    QrcodeVue
  },
  data() {
    return {
      userName: '',
      userEmail: '',
      userParamsEmail: this.$route.query.email,
      userId: this.$route.params.id,
      userParamsToken: this.$route.query.token,
      isAuthorized: false,
      qrCodeUrl: '',
      scans: [],
      loading: true,
      error: null,
      showEnlargedQR: false
    }
  },
  async created() {
    try {
      await this.validateUser();
      this.loading = false;  // Set loading to false after validation
    } catch (error) {
      console.error('Validation error:', error);
      this.loading = false;
      this.$router.push('/user-login');
    }
  },
  methods: {
    async validateUser() {
      try {
        const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/user_validation', {
          id: this.userId,
          email: this.userParamsEmail,
          token: this.userParamsToken
        });

        console.log('Validation response:', response.data); // Debug log

        if (response.data.valid) {
          this.isAuthorized = true;
          await this.fetchUserData();
          await this.fetchScanHistory();
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        console.error('Validation failed:', error);
        this.isAuthorized = false;
        throw error;
      }
    },
    async fetchUserData() {
      try {
        const response = await axios.get(`https://qrscannerdb-production.up.railway.app/api/call/people/${this.userId}`);
        const userData = response.data;

        console.log('userData:',response.data);
        
        this.userName = userData.firstname + ' ' + userData.lastname;
        this.userEmail = userData.email;
        this.qrCodeUrl = userData.qr_code;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
      }
    },
    formatDateTime(dateStr) {
      if (!dateStr) return 'No date';
      const date = new Date(dateStr);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    async fetchScanHistory() {
      try {
        const response = await axios.get(`https://qrscannerdb-production.up.railway.app/api/call/history/${this.userId}`);
        console.log('Response data:', response.data); // Debug log
        
        // Convert to array if it's a single object
        const allScans = Array.isArray(response.data) ? response.data : [response.data];
        let filteredScans = [];
        
        for (let i = 0; i < allScans.length; i++) {
          if (allScans[i].person_id === parseInt(this.userId)) {
            filteredScans.push({
              date: allScans[i].datetime,
              description: allScans[i].description
            });
          }
        }
        
        this.scans = filteredScans;

      } catch (error) {
        console.error('Error fetching scan history:', error);
        this.scans = [];
        throw new Error('Failed to fetch scan history');
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/user_login');
    }
  }
}
</script>

<style scoped>
.h-30 {
  height: 7.5rem;
}

/* Custom Scrollbar Styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 #F1F5F9;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #CBD5E1;
  border-radius: 3px;
  border: 2px solid #F1F5F9;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94A3B8;
}

/* Optional: Add fade animation for modal */
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