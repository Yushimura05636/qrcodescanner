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
    <div class="h-30 md:h-30 bg-gradient-to-r from-blue-500 to-blue-600 w-full flex items-center justify-between relative px-4 md:px-8" style="z-index: 1;">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center">
        <svg 
          class="h-6 w-6 md:h-8 md:w-8 text-white mr-2 md:mr-3" 
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
        <h1 class="text-xl md:text-2xl font-bold text-white">QR Scanner</h1>
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
    <div class="flex-grow w-full flex flex-col items-center px-4 md:px-8 pt-4 md:pt-8 relative" style="z-index: 1;">
      <div class="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 overflow-x-auto">
          <nav class="flex space-x-4 md:space-x-8 px-4 md:px-6 whitespace-nowrap" aria-label="Tabs">
            <button 
              @click="currentTab = 'dashboard'"
              :class="[
                currentTab === 'dashboard' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Dashboard
            </button>
            <button 
              @click="currentTab = 'profile'"
              :class="[
                currentTab === 'profile' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Profile
            </button>
            <button 
              @click="currentTab = 'settings'"
              :class="[
                currentTab === 'settings' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Settings
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-4 md:p-8">
          <!-- Dashboard Tab -->
          <div v-if="currentTab === 'dashboard'" class="space-y-4 md:space-y-6">
            <!-- Loading State -->
            <div v-if="loading" class="p-8 flex justify-center items-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="p-8 text-center text-red-600">
              {{ error }}
            </div>

            <!-- Content -->
            <div v-else>
              <h2 class="text-xl font-bold text-gray-900 mb-6">User Dashboard</h2>
              
              <!-- QR Code Display Section -->
              <div class="flex flex-col items-center justify-center mb-6">
                <div 
                  @click="showEnlargedQR = true"
                  class="bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >
                  <qrcode-vue 
                    :value="qrCodeUrl" 
                    :size="window.innerWidth < 768 ? 160 : 192" 
                    level="H"
                    render-as="svg"
                  />
                </div>
                <p class="text-xs md:text-sm text-gray-600 mt-3">Your Personal QR Code (Click to enlarge)</p>
              </div>

              <!-- Enlarged QR Code Modal -->
              <div 
                v-if="showEnlargedQR" 
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                @click="showEnlargedQR = false"
              >
                <div 
                  class="bg-white p-4 md:p-8 rounded-lg shadow-xl w-full max-w-sm md:max-w-xl mx-auto"
                  @click.stop
                >
                  <div class="flex justify-end mb-2">
                    <button 
                      @click="showEnlargedQR = false"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div class="flex justify-center items-center">
                    <qrcode-vue 
                      :value="qrCodeUrl" 
                      :size="window.innerWidth < 768 ? Math.min(window.innerWidth - 80, 300) : 400" 
                      level="H"
                      render-as="svg"
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <!-- Stats and Profile Cards -->
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-6 md:mb-8">
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
                    <p class="text-sm text-gray-600">
                      <span class="font-medium">Qr code:</span> {{ qrCodeUrl }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <span class="font-medium">Student Id:</span> {{ userId }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <span class="font-medium">Address:</span> {{ userAddress }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Scan History Table -->
              <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div class="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
                  <h3 class="text-base md:text-lg font-semibold text-gray-900">Scan History</h3>
                </div>
                <div class="max-h-[300px] md:max-h-[160px] overflow-y-auto custom-scrollbar">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th class="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th class="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="scans.length === 0">
                        <td colspan="2" class="px-6 py-4 text-center text-sm text-gray-500">
                          No scan history available
                        </td>
                      </tr>
                      <tr v-for="(scan, index) in sortedScans" :key="index" class="h-[60px]">
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

          <!-- Profile Tab -->
          <div v-if="currentTab === 'profile'" class="space-y-4 md:space-y-6">
            <h3 class="text-base md:text-lg font-medium text-gray-900">Edit Profile</h3>
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    v-model="profileForm.firstname"
                    class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    v-model="profileForm.lastname"
                    class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    v-model="profileForm.email"
                    class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Phone</label>
                  <input 
                    type="tel" 
                    v-model="profileForm.phone"
                    class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  >
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Address</label>
                  <input 
                    type="text" 
                    v-model="profileForm.address"
                    class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  >
                </div>
              </div>
              <div class="flex justify-end">
                <button 
                  type="submit"
                  class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  :disabled="updating"
                >
                  {{ updating ? 'Updating...' : 'Update Profile' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Settings Tab -->
          <div v-if="currentTab === 'settings'" class="space-y-4 md:space-y-6">
            <h3 class="text-base md:text-lg font-medium text-gray-900">Change Password</h3>
            <form @submit.prevent="updatePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Current Password</label>
                <input 
                  type="password" 
                  v-model="passwordForm.currentPassword"
                  class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  placeholder="Enter current password"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">New Password</label>
                <input 
                  type="password" 
                  v-model="passwordForm.newPassword"
                  class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  placeholder="Enter new password"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input 
                  type="password" 
                  v-model="passwordForm.confirmPassword"
                  class="mt-1 block w-full px-3 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200 text-blue-900 placeholder-blue-400"
                  placeholder="Confirm new password"
                >
              </div>
              <div class="flex justify-end">
                <button 
                  type="submit"
                  class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  :disabled="updatingPassword"
                >
                  {{ updatingPassword ? 'Updating...' : 'Update Password' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-blue-500 to-blue-600 w-full mt-auto relative" style="z-index: 1;"></div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="bg-white rounded-xl p-8 shadow-xl relative z-10 max-w-sm w-full mx-4 transform animate-modal">
        <div class="text-center">
          <!-- Logo Image -->
          <div class="flex">
            <div class="flex-auto"></div>
            <div class="mx-auto w-24 h-24 rounded-full bg-green-100 mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src="../assets/img/Logo.png" 
                alt="Success Logo" 
                class="w-16 h-16 object-contain animate-logo"
              />
            </div>
            <div class="flex-auto"></div>
          </div>
          <h3 class="text-xl font-medium text-gray-900 mb-2">{{ successMessage }}</h3>
          <button 
            @click="closeSuccessModal" 
            class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div v-if="showErrorModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="bg-white rounded-xl p-8 shadow-xl relative z-10 max-w-sm w-full mx-4 transform animate-modal">
        <div class="text-center">
          <!-- Logo Image -->
          <div class="flex">
            <div class="flex-auto"></div>
            <div class="mx-auto w-24 h-24 rounded-full bg-red-100 mb-6 flex items-center justify-center overflow-hidden">
              <img 
                src="../assets/img/Logo.png" 
                alt="Error Logo" 
                class="w-16 h-16 object-contain animate-logo"
              />
            </div>
            <div class="flex-auto"></div>
          </div>
          <h3 class="text-xl font-medium text-gray-900 mb-2">{{ errorMessage }}</h3>
          <button 
            @click="closeErrorModal" 
            class="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import axios from 'axios';
import { config } from '../router'; 
const API_URL = config.API_URL;

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
      userAddress: '',
      userParamsToken: this.$route.query.token,
      isAuthorized: false,
      qrCodeUrl: '',
      scans: [],
      loading: true,
      error: null,
      showEnlargedQR: false,
      sortKey: 'date',
      sortOrder: 'desc', // Default to descending (latest first)
      currentTab: 'dashboard',
      profileForm: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      updating: false,
      updatingPassword: false,
      window: {
        innerWidth: window.innerWidth
      },
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  computed: {
    sortedScans() {
      return [...this.scans].sort((a, b) => {
        let aValue = a[this.sortKey];
        let bValue = b[this.sortKey];

        // Convert dates for comparison if sorting by date
        if (this.sortKey === 'date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        // For descending order
        if (this.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        // For ascending order
        return aValue < bValue ? -1 : 1;
      });
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
  mounted() {
    // Add window resize listener
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // Remove window resize listener
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async validateUser() {
      try {
        const response = await axios.post(`${API_URL}/user_validation`, {
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
        const response = await axios.get(`${API_URL}/call/people/${this.userId}`);
        const userData = response.data;
        
        // Update both display data and form data
        this.userName = userData.firstname + ' ' + userData.lastname;
        this.userEmail = userData.email;
        this.qrCodeUrl = userData.qr_code;
        this.userAddress = userData.address;
        
        // Update profile form
        this.profileForm = {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phone: userData.phone,
          address: userData.address
        };
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
        const response = await axios.get(`${API_URL}/call/history/${this.userId}`);
        
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
        
        // Sort by date in descending order by default
        this.scans = filteredScans.sort((a, b) => new Date(b.date) - new Date(a.date));

      } catch (error) {
        console.error('Error fetching scan history:', error);
        this.scans = [];
        throw new Error('Failed to fetch scan history');
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/user_login');
    },
    sortBy(key) {
      // If clicking the same key, reverse the order
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'desc'; // Default to descending when changing sort key
      }
    },
    getSortIcon(key) {
      if (this.sortKey !== key) return '↕️';
      return this.sortOrder === 'asc' ? '↑' : '↓';
    },
    async updateProfile() {
      try {
        this.updating = true;
        const response = await axios.put(`${API_URL}/call/people/${this.userId}`, this.profileForm);
        if (response.data) {
          this.successMessage = 'Profile updated successfully';
          this.showSuccessModal = true;
          await this.fetchUserData();
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update profile';
        this.showErrorModal = true;
      } finally {
        this.updating = false;
      }
    },
    async updatePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.errorMessage = 'New passwords do not match';
        this.showErrorModal = true;
        return;
      }

      try {
        this.updatingPassword = true;
        const response = await axios.post(`${API_URL}/reset_password`, {
          user_id: this.userId,
          current_password: this.passwordForm.currentPassword,
          password: this.passwordForm.newPassword,
          type: 'user',
        });
        
        if (response.data) {
          this.successMessage = 'Password updated successfully';
          this.showSuccessModal = true;
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
        }
      } catch (error) {
        console.error('Error updating password:', error);
        this.errorMessage = error.response?.data?.message || 'Failed to update password';
        this.showErrorModal = true;
      } finally {
        this.updatingPassword = false;
      }
    },
    handleResize() {
      this.window.innerWidth = window.innerWidth;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.successMessage = '';
    },
    closeErrorModal() {
      this.showErrorModal = false;
      this.errorMessage = '';
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

/* Add styles for sortable columns */
th.cursor-pointer {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

th.cursor-pointer:hover {
  background-color: #f3f4f6;
}

@media (max-width: 768px) {
  .h-30 {
    height: 4rem;
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  table {
    font-size: 0.875rem;
  }

  th, td {
    padding: 0.5rem 0.75rem;
  }

  input, select {
    font-size: 16px; /* Prevents iOS zoom on focus */
  }

  /* Improve touch targets */
  button, 
  [role="button"] {
    min-height: 44px;
    padding: 0.5rem 1rem;
  }

  /* Improve modal on mobile */
  .fixed > div {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
    width: calc(100vw - 2rem);
    overflow: hidden;
  }
  
  .fixed svg {
    max-width: 100%;
    height: auto;
  }
}

/* Add smooth transitions for responsive changes */
.h-30,
input,
button,
.custom-scrollbar {
  transition: all 0.3s ease;
}

@keyframes modalFade {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal {
  animation: modalFade 0.3s ease-out forwards;
}

@keyframes logoAppear {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-20deg);
  }
  50% {
    transform: scale(1.1) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.animate-logo {
  opacity: 0;
  animation: logoAppear 0.6s ease-out forwards;
  animation-delay: 0.2s;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #1f2937;
  }
  
  .text-gray-900 {
    color: #f3f4f6;
  }
  
  .text-gray-500 {
    color: #9ca3af;
  }
  
  .bg-green-100 {
    background-color: rgba(74, 222, 128, 0.2);
  }
  
  .bg-red-100 {
    background-color: rgba(248, 113, 113, 0.2);
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
  
  label {
    color: #e2e8f0;
  }
}
</style>