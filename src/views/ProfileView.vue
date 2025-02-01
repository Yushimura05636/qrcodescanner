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
          Dashboard
        </router-link>
        <router-link 
          to="/history" 
          class="nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200"
        >
          History
        </router-link>
        <button 
          @click="logout" 
          class="ml-4 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-200"
        >
          Logout
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex-grow">
      <div class="relative -mt-24 flex flex-col items-center">
        <div class="bg-white rounded-xl shadow-md p-8 w-full mt-12">
          <!-- QR Code Section -->
          <div class="flex flex-col items-center mb-8">
            <div class="flex flex-col items-center space-y-2 mb-8">
              <div 
                class="w-48 h-48 bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                @click="showQrModal = true"
              >
                <img 
                  :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(person?.qr_code)}`"
                  alt="QR Code"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="text-sm text-gray-600">Click QR to enlarge</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Profile Picture & Info -->
            <div class="flex flex-col items-center space-y-4">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100">
                <img 
                  :src="getProfileImage(person.gender)"
                  alt="Profile"
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ person.firstname }} {{ person.lastname }}
              </h3>
              <p class="text-gray-600">{{ person.email }}</p>
            </div>

            <!-- Right Column - Form -->
            <div class="lg:col-span-2">
              <form @submit.prevent="updateProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">First Name</label>
                    <input 
                      type="text" 
                      v-model="person.firstname" 
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input 
                      type="text" 
                      v-model="person.lastname" 
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      v-model="person.email" 
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Phone</label>
                    <input 
                      type="tel" 
                      v-model="person.phone" 
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Gender</label>
                    <select 
                      v-model="person.gender"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div class="flex justify-end space-x-4 pt-4">
                  <button 
                    type="submit" 
                    class="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-200"
                    :disabled="loading"
                  >
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Modal -->
    <div 
      v-if="showQrModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="showQrModal = false"
    >
      <div 
        class="bg-white rounded-xl p-6 max-w-lg w-full flex flex-col items-center space-y-4"
        @click.stop
      >
        <div class="w-full flex justify-end">
          <button 
            @click="showQrModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="w-64 h-64 bg-white rounded-lg shadow-md p-2">
          <img 
            :src="`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(person.qr_code)}`"
            alt="QR Code Large"
            class="w-full h-full object-contain"
          />
        </div>
        
        <div class="flex space-x-4">
          <button 
            @click="downloadQR"
            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download QR</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div 
      v-if="showSuccess" 
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Profile updated successfully</span>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileView',
  data() {
    return {
      person: null,
      originalPerson: null,
      loading: true,
      error: null,
      isEditing: false,
      saving: false,
      showSuccess: false,
      showQrModal: false,
      maleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
      femaleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png'
    }
  },
  computed: {
    profileImage() {
      return this.person.gender === 'male' ? this.maleImage : this.femaleImage
    }
  },
  created() {
    // Check for both query parameter and route parameter
    const queryId = this.$route.query.id;
    const paramId = this.$route.params.id;
    const id = queryId || paramId;

    if (id) {
      this.fetchProfile(id);
    } else {
      this.error = 'No profile ID provided';
      this.loading = false;
    }
  },
  methods: {
    async fetchProfile(id) {
      try {
        this.loading = true;
        const response = await axios.get(`https://qrscannerdb-production.up.railway.app/api/call/people/${id}`);
        this.person = response.data;
        this.originalPerson = { ...response.data };
      } catch (error) {
        console.error('Error fetching profile:', error);
        this.error = 'Failed to load profile';
      } finally {
        this.loading = false;
      }
    },
    startEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.person = { ...this.originalPerson };
      this.isEditing = false;
    },
    async saveChanges() {
      try {
        this.saving = true;
        const response = await axios.put(
          `https://qrscannerdb-production.up.railway.app/api/call/people/${this.person.id}`,
          this.person
        );
        this.person = response.data;
        this.originalPerson = { ...response.data };
        this.isEditing = false;
        
        // Show success popup
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          // Refresh the page
          window.location.reload();
        }, 2000);
        
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      } finally {
        this.saving = false;
      }
    },
    async downloadQR() {
      try {
        const response = await fetch(
          `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(this.person.qr_code)}`
        );
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-code-${this.person.firstname}-${this.person.lastname}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Failed to download QR code:', error);
      }
    },
    logout() {
      // Clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Redirect to login page
      window.location.href = '/login'
    },
    getProfileImage(gender) {
      return gender === 'male' ? this.maleImage : this.femaleImage;
    },
    async updateProfile() {
      try {
        this.loading = true
        const response = await fetch(`https://qrscannerdb-production.up.railway.app/api/call/people/${this.person.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.person)
        })

        if (response.ok) {
          this.showSuccess = true
          setTimeout(() => {
            window.location.href = '/history' // Changed from '/history'
          }, 1500)
        } else {
          throw new Error('Failed to update profile')
        }
      } catch (error) {
        console.error('Error updating profile:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.bg-gradient-pattern {
  background-color: #f8fafc;
  background-image: 
    radial-gradient(at 40% 20%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(251, 146, 60, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(251, 146, 60, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 100%, rgba(251, 146, 60, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 0%, rgba(251, 146, 60, 0.1) 0px, transparent 50%);
}

.bg-grid-pattern {
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .bg-gradient-pattern {
    background-color: #1a1c20;
    background-image: 
      radial-gradient(at 40% 20%, rgba(251, 146, 60, 0.2) 0px, transparent 50%),
      radial-gradient(at 80% 0%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(251, 146, 60, 0.2) 0px, transparent 50%),
      radial-gradient(at 80% 50%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(251, 146, 60, 0.2) 0px, transparent 50%),
      radial-gradient(at 80% 100%, rgba(251, 146, 60, 0.15) 0px, transparent 50%),
      radial-gradient(at 0% 0%, rgba(251, 146, 60, 0.15) 0px, transparent 50%);
  }

  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }

  .bg-white\/90 {
    background-color: rgba(45, 55, 72, 0.9);
  }
}

@media (prefers-color-scheme: dark) {
  .bg-gray-50 {
    background-color: #1a1c20;
  }
  
  .bg-white {
    background-color: #2d3748;
  }

  .text-gray-900 {
    color: #fff;
  }

  .text-gray-600, .text-gray-500 {
    color: #a0aec0;
  }

  input, select {
    background-color: #2d3748;
    color: #fff;
    border-color: #4a5568;
  }

  input:disabled, select:disabled {
    background-color: #1a202c;
    color: #718096;
  }

  .border-gray-200 {
    border-color: #4a5568;
  }
}

/* Custom Scrollbar Styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(251, 146, 60, 0.5) rgba(251, 146, 60, 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(251, 146, 60, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(251, 146, 60, 0.5);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 146, 60, 0.7);
}

/* Smooth Scrolling */
.custom-scrollbar {
  scroll-behavior: smooth;
}

/* Dark mode scrollbar adjustments */
@media (prefers-color-scheme: dark) {
  .custom-scrollbar {
    scrollbar-color: rgba(251, 146, 60, 0.6) rgba(251, 146, 60, 0.2);
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(251, 146, 60, 0.2);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(251, 146, 60, 0.6);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 146, 60, 0.8);
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

@keyframes check {
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

.animate-check {
  stroke-dasharray: 0, 100;
  animation: check 0.8s ease-out forwards;
  animation-delay: 0.2s;
}

/* Dark mode adjustments for popup */
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
}

/* Dark mode support for QR modal */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #1f2937;
  }
  
  .text-gray-500 {
    color: #9ca3af;
  }
  
  .text-gray-500:hover {
    color: #f3f4f6;
  }
}

select {
  @apply appearance-none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Dark mode support for select */
@media (prefers-color-scheme: dark) {
  select {
    background-color: #374151;
    border-color: #4b5563;
    color: #e5e7eb;
  }

  select:focus {
    border-color: #f97316;
  }
}
</style> 